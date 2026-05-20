import { Router, Request, Response } from 'express';
import { prisma } from '../../config/database';
import { isAuth } from '../../middleware/auth.middleware';
import { isAdmin } from '../../middleware/role.middleware';
import { sendSuccess, sendCreated, sendError } from '../../utils/response.utils';
import { z } from 'zod';
import { validate } from '../../middleware/validate.middleware';

const createReviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  title: z.string().max(200).optional(),
  comment: z.string().min(10, 'Review must be at least 10 characters'),
  images: z.array(z.string()).default([]),
});

const router = Router({ mergeParams: true });

// Get reviews for a product
router.get('/products/:productId/reviews', async (req: Request, res: Response) => {
  const reviews = await prisma.review.findMany({
    where: { productId: req.params['productId'] },
    include: { user: { select: { name: true, avatar: true } } },
    orderBy: { createdAt: 'desc' },
  });

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  sendSuccess(res, { reviews, avgRating: Math.round(avgRating * 10) / 10, total: reviews.length }, 'Reviews fetched');
});

// Create review
router.post('/products/:productId/reviews', isAuth, validate(createReviewSchema), async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { productId } = req.params;

  const existing = await prisma.review.findFirst({ where: { userId, productId } });
  if (existing) {
    sendError(res, 'You have already reviewed this product', 409);
    return;
  }

  const review = await prisma.review.create({
    data: { userId, productId, ...req.body },
    include: { user: { select: { name: true, avatar: true } } },
  });
  sendCreated(res, review, 'Review submitted');
});

// Update review
router.patch('/reviews/:id', isAuth, validate(createReviewSchema.partial()), async (req: Request, res: Response) => {
  const review = await prisma.review.findFirst({
    where: { id: req.params['id'], userId: req.user!.userId },
  });
  if (!review) {
    sendError(res, 'Review not found', 404);
    return;
  }
  const updated = await prisma.review.update({ where: { id: req.params['id'] }, data: req.body });
  sendSuccess(res, updated, 'Review updated');
});

// Delete review
router.delete('/reviews/:id', isAuth, async (req: Request, res: Response) => {
  const review = await prisma.review.findFirst({
    where: { id: req.params['id'] },
  });
  if (!review) {
    sendError(res, 'Review not found', 404);
    return;
  }
  const isOwner = review.userId === req.user!.userId;
  const isAdmin_ = req.user!.role === 'ADMIN';
  if (!isOwner && !isAdmin_) {
    sendError(res, 'Unauthorized', 403);
    return;
  }
  await prisma.review.delete({ where: { id: req.params['id'] } });
  sendSuccess(res, null, 'Review deleted');
});

export { router as reviewsRouter };
export default router;
