import { Router, Request, Response } from 'express';
import { prisma } from '../../config/database';
import { isAuth } from '../../middleware/auth.middleware';
import { sendSuccess, sendError } from '../../utils/response.utils';

const router = Router();

router.get('/:orderId', isAuth, async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const userId = req.user!.userId;

  const order = await prisma.order.findFirst({
    where: { id: orderId, userId },
    include: { tracking: { orderBy: { timestamp: 'asc' } } },
  });

  if (!order) {
    sendError(res, 'Order not found', 404);
    return;
  }

  sendSuccess(res, order.tracking, 'Tracking fetched');
});

export default router;
