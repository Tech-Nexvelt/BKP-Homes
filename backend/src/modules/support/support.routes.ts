import { Router, Request, Response } from 'express';
import { prisma } from '../../config/database';
import { isAuth } from '../../middleware/auth.middleware';
import { isAdmin } from '../../middleware/role.middleware';
import { sendSuccess, sendCreated } from '../../utils/response.utils';
import { HttpError } from '../../middleware/error.middleware';
import { getPagination, buildPaginationMeta } from '../../utils/pagination.utils';
import { z } from 'zod';
import { validate } from '../../middleware/validate.middleware';

const createTicketSchema = z.object({
  subject: z.string().min(5).max(200),
  category: z.string().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
  message: z.string().min(10, 'Please describe your issue'),
  attachments: z.array(z.string()).default([]),
});

const replySchema = z.object({
  message: z.string().min(1),
  attachments: z.array(z.string()).default([]),
});

const router = Router();

// Customer: create ticket
router.post('/tickets', isAuth, validate(createTicketSchema), async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { subject, category, priority, message, attachments } = req.body as {
    subject: string; category?: string; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
    message: string; attachments: string[];
  };

  const ticket = await prisma.supportTicket.create({
    data: {
      userId,
      subject,
      category,
      priority,
      messages: {
        create: { senderId: userId, message, attachments, isStaff: false },
      },
    },
    include: { messages: true },
  });
  sendCreated(res, ticket, 'Support ticket created');
});

// Customer: get own tickets
router.get('/tickets', isAuth, async (req: Request, res: Response) => {
  const { page, limit } = req.query;
  const { skip, take, page: p, limit: l } = getPagination(page, limit);
  const userId = req.user!.userId;

  const [tickets, total] = await Promise.all([
    prisma.supportTicket.findMany({
      where: { userId },
      skip,
      take,
      orderBy: { updatedAt: 'desc' },
      include: { messages: { take: 1, orderBy: { createdAt: 'desc' } } },
    }),
    prisma.supportTicket.count({ where: { userId } }),
  ]);

  sendSuccess(res, tickets, 'Tickets fetched', 200, buildPaginationMeta(total, p, l));
});

// Customer: get ticket by id
router.get('/tickets/:id', isAuth, async (req: Request, res: Response) => {
  const ticket = await prisma.supportTicket.findFirst({
    where: { id: req.params['id'], userId: req.user!.userId },
    include: { messages: { orderBy: { createdAt: 'asc' } } },
  });
  if (!ticket) throw new HttpError('Ticket not found', 404);
  sendSuccess(res, ticket, 'Ticket fetched');
});

// Customer: reply to ticket
router.post('/tickets/:id/message', isAuth, validate(replySchema), async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const ticket = await prisma.supportTicket.findFirst({
    where: { id: req.params['id'], userId },
  });
  if (!ticket) throw new HttpError('Ticket not found', 404);

  const message = await prisma.ticketMessage.create({
    data: {
      ticketId: req.params['id']!,
      senderId: userId,
      message: req.body.message,
      attachments: req.body.attachments,
      isStaff: false,
    },
  });

  await prisma.supportTicket.update({
    where: { id: req.params['id'] },
    data: { status: 'IN_PROGRESS', updatedAt: new Date() },
  });

  sendCreated(res, message, 'Reply sent');
});

// Admin: get all tickets
router.get('/admin/tickets', isAuth, isAdmin, async (req: Request, res: Response) => {
  const { page, limit, status, priority } = req.query;
  const { skip, take, page: p, limit: l } = getPagination(page, limit);
  const where: Record<string, unknown> = {};
  if (status) where['status'] = status;
  if (priority) where['priority'] = priority;

  const [tickets, total] = await Promise.all([
    prisma.supportTicket.findMany({
      where: where as Parameters<typeof prisma.supportTicket.findMany>[0]['where'],
      skip,
      take,
      orderBy: { updatedAt: 'desc' },
      include: {
        user: { select: { name: true, email: true } },
        messages: { take: 1, orderBy: { createdAt: 'desc' } },
      },
    }),
    prisma.supportTicket.count({ where: where as Parameters<typeof prisma.supportTicket.count>[0]['where'] }),
  ]);
  sendSuccess(res, tickets, 'Tickets fetched', 200, buildPaginationMeta(total, p, l));
});

// Admin: update ticket (status, assignee)
router.patch('/admin/tickets/:id', isAuth, isAdmin, async (req: Request, res: Response) => {
  const ticket = await prisma.supportTicket.update({
    where: { id: req.params['id'] },
    data: req.body,
    include: { messages: { orderBy: { createdAt: 'asc' } } },
  });
  sendSuccess(res, ticket, 'Ticket updated');
});

// Admin: reply to ticket
router.post('/admin/tickets/:id/reply', isAuth, isAdmin, validate(replySchema), async (req: Request, res: Response) => {
  const message = await prisma.ticketMessage.create({
    data: {
      ticketId: req.params['id']!,
      senderId: req.user!.userId,
      message: req.body.message,
      attachments: req.body.attachments,
      isStaff: true,
    },
  });
  await prisma.supportTicket.update({
    where: { id: req.params['id'] },
    data: { updatedAt: new Date() },
  });
  sendCreated(res, message, 'Reply sent');
});

export default router;
