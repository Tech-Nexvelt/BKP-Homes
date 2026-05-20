import { Router } from 'express';
import { Request, Response } from 'express';
import { prisma } from '../../config/database';
import { isAuth } from '../../middleware/auth.middleware';
import { isAdmin } from '../../middleware/role.middleware';
import { validate } from '../../middleware/validate.middleware';
import { sendSuccess, sendCreated } from '../../utils/response.utils';
import { HttpError } from '../../middleware/error.middleware';
import { z } from 'zod';

const createCategorySchema = z.object({
  name: z.string().min(2).max(100).trim(),
  slug: z.string().regex(/^[a-z0-9-]+$/).optional(),
  description: z.string().optional(),
  image: z.string().url().optional(),
  parentId: z.string().optional(),
  sortOrder: z.number().int().default(0),
});

const updateCategorySchema = createCategorySchema.partial();

const slugify = (text: string) =>
  text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const categories = await prisma.category.findMany({
    where: { parentId: null },
    include: { children: true },
    orderBy: { sortOrder: 'asc' },
  });
  sendSuccess(res, categories, 'Categories fetched');
});

router.get('/tree', async (_req: Request, res: Response) => {
  const categories = await prisma.category.findMany({
    where: { parentId: null },
    include: {
      children: {
        include: { children: true },
        orderBy: { sortOrder: 'asc' },
      },
    },
    orderBy: { sortOrder: 'asc' },
  });
  sendSuccess(res, categories, 'Category tree fetched');
});

router.get('/:slug', async (req: Request, res: Response) => {
  const category = await prisma.category.findUnique({
    where: { slug: req.params['slug'] },
    include: {
      children: { orderBy: { sortOrder: 'asc' } },
      parent: true,
    },
  });
  if (!category) throw new HttpError('Category not found', 404);
  sendSuccess(res, category, 'Category fetched');
});

router.post('/', isAuth, isAdmin, validate(createCategorySchema), async (req: Request, res: Response) => {
  const data = req.body;
  const slug = data.slug || slugify(data.name);
  const existing = await prisma.category.findUnique({ where: { slug } });
  const finalSlug = existing ? `${slug}-${Date.now()}` : slug;
  const category = await prisma.category.create({ data: { ...data, slug: finalSlug } });
  sendCreated(res, category, 'Category created');
});

router.patch('/:id', isAuth, isAdmin, validate(updateCategorySchema), async (req: Request, res: Response) => {
  const category = await prisma.category.update({
    where: { id: req.params['id'] },
    data: req.body,
  });
  sendSuccess(res, category, 'Category updated');
});

router.delete('/:id', isAuth, isAdmin, async (req: Request, res: Response) => {
  await prisma.category.delete({ where: { id: req.params['id'] } });
  sendSuccess(res, null, 'Category deleted');
});

export default router;
