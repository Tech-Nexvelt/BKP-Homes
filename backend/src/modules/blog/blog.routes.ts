import { Router, Request, Response } from 'express';
import { prisma } from '../../config/database';
import { isAuth } from '../../middleware/auth.middleware';
import { isAdmin } from '../../middleware/role.middleware';
import { sendSuccess, sendCreated } from '../../utils/response.utils';
import { HttpError } from '../../middleware/error.middleware';
import { getPagination, buildPaginationMeta } from '../../utils/pagination.utils';
import { z } from 'zod';
import { validate } from '../../middleware/validate.middleware';

const createBlogSchema = z.object({
  title: z.string().min(5).max(300).trim(),
  slug: z.string().regex(/^[a-z0-9-]+$/).optional(),
  excerpt: z.string().max(500).optional(),
  content: z.string().min(50),
  coverImage: z.string().url().optional(),
  tags: z.array(z.string()).default([]),
  category: z.string().optional(),
  isPublished: z.boolean().default(false),
  readTime: z.number().int().positive().optional(),
  authorId: z.string().optional(),
});

const slugify = (text: string) =>
  text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const router = Router();

// Public: get all published posts
router.get('/', async (req: Request, res: Response) => {
  const { page, limit, category, q } = req.query;
  const { skip, take, page: p, limit: l } = getPagination(page, limit);

  const where: Record<string, unknown> = { isPublished: true };
  if (category) where['category'] = category;
  if (q) {
    where['OR'] = [
      { title: { contains: q, mode: 'insensitive' } },
      { excerpt: { contains: q, mode: 'insensitive' } },
    ];
  }

  const [posts, total] = await Promise.all([
    prisma.blog.findMany({
      where: where as Parameters<typeof prisma.blog.findMany>[0]['where'],
      skip,
      take,
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true, title: true, slug: true, excerpt: true, coverImage: true,
        tags: true, category: true, publishedAt: true, readTime: true, authorId: true,
      },
    }),
    prisma.blog.count({ where: where as Parameters<typeof prisma.blog.count>[0]['where'] }),
  ]);

  sendSuccess(res, posts, 'Blog posts fetched', 200, buildPaginationMeta(total, p, l));
});

// Public: get post by slug
router.get('/:slug', async (req: Request, res: Response) => {
  const post = await prisma.blog.findUnique({
    where: { slug: req.params['slug'] },
  });
  if (!post || !post.isPublished) throw new HttpError('Post not found', 404);
  sendSuccess(res, post, 'Blog post fetched');
});

// Admin: create post
router.post('/', isAuth, isAdmin, validate(createBlogSchema), async (req: Request, res: Response) => {
  const data = req.body;
  const slug = data.slug || slugify(data.title);
  const existing = await prisma.blog.findUnique({ where: { slug } });
  const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

  const post = await prisma.blog.create({
    data: {
      ...data,
      slug: finalSlug,
      authorId: data.authorId || req.user!.userId,
      publishedAt: data.isPublished ? new Date() : null,
    },
  });
  sendCreated(res, post, 'Blog post created');
});

// Admin: update post
router.patch('/:id', isAuth, isAdmin, validate(createBlogSchema.partial()), async (req: Request, res: Response) => {
  const data = req.body;
  const post = await prisma.blog.update({
    where: { id: req.params['id'] },
    data: {
      ...data,
      publishedAt: data.isPublished ? new Date() : undefined,
    },
  });
  sendSuccess(res, post, 'Blog post updated');
});

// Admin: delete post
router.delete('/:id', isAuth, isAdmin, async (req: Request, res: Response) => {
  await prisma.blog.delete({ where: { id: req.params['id'] } });
  sendSuccess(res, null, 'Blog post deleted');
});

export default router;
