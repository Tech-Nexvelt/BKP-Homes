import { Router, Request, Response } from 'express';
import { prisma } from '../../config/database';
import { isAuth } from '../../middleware/auth.middleware';
import { isAdmin } from '../../middleware/role.middleware';
import { sendSuccess, sendCreated } from '../../utils/response.utils';
import { z } from 'zod';
import { validate } from '../../middleware/validate.middleware';

const sendNotificationSchema = z.object({
  target: z.enum(['all', 'role', 'user']),
  role: z.enum(['CUSTOMER', 'ADMIN', 'EMPLOYEE']).optional(),
  userId: z.string().optional(),
  type: z.enum(['info', 'order', 'promo']).default('info'),
  title: z.string().min(1).max(200),
  message: z.string().min(1).max(1000),
  link: z.string().url().optional(),
});

const router = Router();

// Get user notifications
router.get('/', isAuth, async (req: Request, res: Response) => {
  const notifications = await prisma.notification.findMany({
    where: { userId: req.user!.userId },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });
  sendSuccess(res, notifications, 'Notifications fetched');
});

// Mark single as read
router.patch('/:id/read', isAuth, async (req: Request, res: Response) => {
  await prisma.notification.updateMany({
    where: { id: req.params['id'], userId: req.user!.userId },
    data: { isRead: true },
  });
  sendSuccess(res, null, 'Notification marked as read');
});

// Mark all as read
router.patch('/read-all', isAuth, async (req: Request, res: Response) => {
  await prisma.notification.updateMany({
    where: { userId: req.user!.userId },
    data: { isRead: true },
  });
  sendSuccess(res, null, 'All notifications marked as read');
});

// Admin: send notification
router.post('/', isAuth, isAdmin, validate(sendNotificationSchema), async (req: Request, res: Response) => {
  const { target, role, userId, type, title, message, link } = req.body as {
    target: 'all' | 'role' | 'user';
    role?: 'CUSTOMER' | 'ADMIN' | 'EMPLOYEE';
    userId?: string;
    type: string;
    title: string;
    message: string;
    link?: string;
  };

  let userIds: string[] = [];

  if (target === 'user' && userId) {
    userIds = [userId];
  } else if (target === 'role' && role) {
    const users = await prisma.user.findMany({
      where: { role, isActive: true },
      select: { id: true },
    });
    userIds = users.map((u) => u.id);
  } else if (target === 'all') {
    const users = await prisma.user.findMany({
      where: { isActive: true },
      select: { id: true },
    });
    userIds = users.map((u) => u.id);
  }

  await prisma.notification.createMany({
    data: userIds.map((uid) => ({ userId: uid, type, title, message, link })),
  });

  sendCreated(res, { sent: userIds.length }, `Notification sent to ${userIds.length} users`);
});

export default router;
