import { Router, Request, Response } from 'express';
import { prisma } from '../../config/database';
import { isAuth } from '../../middleware/auth.middleware';
import { isAdmin } from '../../middleware/role.middleware';
import { sendSuccess, sendCreated } from '../../utils/response.utils';
import { getPagination, buildPaginationMeta } from '../../utils/pagination.utils';
import { z } from 'zod';
import { validate } from '../../middleware/validate.middleware';

const createRequestSchema = z.object({
  roomPhotos: z.array(z.string()).default([]),
  referenceImages: z.array(z.string()).default([]),
  width: z.number().positive().optional(),
  height: z.number().positive().optional(),
  depth: z.number().positive().optional(),
  material: z.string().optional(),
  color: z.string().optional(),
  finish: z.string().optional(),
  budget: z.number().positive().optional(),
  notes: z.string().max(1000).optional(),
  preferredDate: z.string().datetime().optional(),
});

const router = Router();

// Customer: create request
router.post('/', isAuth, validate(createRequestSchema), async (req: Request, res: Response) => {
  const request = await prisma.customFurnitureRequest.create({
    data: {
      userId: req.user!.userId,
      ...req.body,
      preferredDate: req.body.preferredDate ? new Date(req.body.preferredDate) : undefined,
    },
  });
  sendCreated(res, request, 'Custom furniture request submitted successfully');
});

// Customer: get own requests
router.get('/', isAuth, async (req: Request, res: Response) => {
  const requests = await prisma.customFurnitureRequest.findMany({
    where: { userId: req.user!.userId },
    orderBy: { createdAt: 'desc' },
  });
  sendSuccess(res, requests, 'Requests fetched');
});

// Admin: get all requests
router.get('/admin', isAuth, isAdmin, async (req: Request, res: Response) => {
  const { page, limit, status } = req.query;
  const { skip, take, page: p, limit: l } = getPagination(page, limit);
  const where = status ? { status: status as string } : {};

  const [requests, total] = await Promise.all([
    prisma.customFurnitureRequest.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { name: true, email: true, phone: true } } },
    }),
    prisma.customFurnitureRequest.count({ where }),
  ]);
  sendSuccess(res, requests, 'Requests fetched', 200, buildPaginationMeta(total, p, l));
});

// Admin: update request
router.patch('/admin/:id', isAuth, isAdmin, async (req: Request, res: Response) => {
  const request = await prisma.customFurnitureRequest.update({
    where: { id: req.params['id'] },
    data: req.body,
  });
  sendSuccess(res, request, 'Request updated');
});

export default router;
