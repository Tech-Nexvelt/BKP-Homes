import { Router, Request, Response } from 'express';
import { prisma } from '../../config/database';
import { isAuth } from '../../middleware/auth.middleware';
import { isAdmin } from '../../middleware/role.middleware';
import { sendSuccess, sendCreated } from '../../utils/response.utils';
import { HttpError } from '../../middleware/error.middleware';
import { z } from 'zod';
import { validate } from '../../middleware/validate.middleware';

const createPortfolioSchema = z.object({
  title: z.string().min(2).max(200).trim(),
  description: z.string().optional(),
  images: z.array(z.string()).default([]),
  roomType: z.string().optional(),
  projectType: z.string().optional(),
  client: z.string().optional(),
  location: z.string().optional(),
  isPublished: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});

const router = Router();

// Public: get all published portfolio projects
router.get('/', async (req: Request, res: Response) => {
  const { roomType } = req.query;
  const where: Record<string, unknown> = { isPublished: true };
  if (roomType) where['roomType'] = roomType;

  const projects = await prisma.portfolio.findMany({
    where: where as Parameters<typeof prisma.portfolio.findMany>[0]['where'],
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
  });
  sendSuccess(res, projects, 'Portfolio fetched');
});

// Public: get by id
router.get('/:id', async (req: Request, res: Response) => {
  const project = await prisma.portfolio.findUnique({ where: { id: req.params['id'] } });
  if (!project || !project.isPublished) throw new HttpError('Project not found', 404);
  sendSuccess(res, project, 'Project fetched');
});

// Admin: create
router.post('/', isAuth, isAdmin, validate(createPortfolioSchema), async (req: Request, res: Response) => {
  const project = await prisma.portfolio.create({ data: req.body });
  sendCreated(res, project, 'Portfolio project created');
});

// Admin: update
router.patch('/:id', isAuth, isAdmin, validate(createPortfolioSchema.partial()), async (req: Request, res: Response) => {
  const project = await prisma.portfolio.update({ where: { id: req.params['id'] }, data: req.body });
  sendSuccess(res, project, 'Portfolio project updated');
});

// Admin: delete
router.delete('/:id', isAuth, isAdmin, async (req: Request, res: Response) => {
  await prisma.portfolio.delete({ where: { id: req.params['id'] } });
  sendSuccess(res, null, 'Portfolio project deleted');
});

export default router;
