import { Router, Request, Response } from 'express';
import { prisma } from '../../config/database';
import { isAuth } from '../../middleware/auth.middleware';
import { isAdmin } from '../../middleware/role.middleware';
import { sendSuccess } from '../../utils/response.utils';

const router = Router();

// Overview
router.get('/overview', isAuth, isAdmin, async (_req: Request, res: Response) => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - 7);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const [
    totalRevenue,
    ordersToday,
    newCustomersThisWeek,
    pendingTickets,
    totalOrders,
    totalProducts,
  ] = await Promise.all([
    prisma.order.aggregate({
      where: {
        createdAt: { gte: startOfMonth },
        status: { not: 'CANCELLED' },
      },
      _sum: { totalAmount: true },
    }),
    prisma.order.count({ where: { createdAt: { gte: today } } }),
    prisma.user.count({
      where: { createdAt: { gte: startOfWeek }, role: 'CUSTOMER' },
    }),
    prisma.supportTicket.count({ where: { status: 'OPEN' } }),
    prisma.order.count(),
    prisma.product.count({ where: { isActive: true } }),
  ]);

  sendSuccess(
    res,
    {
      totalRevenueThisMonth: totalRevenue._sum.totalAmount ?? 0,
      ordersToday,
      newCustomersThisWeek,
      pendingTickets,
      totalOrders,
      totalProducts,
    },
    'Analytics overview',
  );
});

// Revenue by month (last 12 months)
router.get('/revenue', isAuth, isAdmin, async (_req: Request, res: Response) => {
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11);
  twelveMonthsAgo.setDate(1);

  const orders = await prisma.order.findMany({
    where: {
      createdAt: { gte: twelveMonthsAgo },
      status: { not: 'CANCELLED' },
    },
    select: { totalAmount: true, createdAt: true },
  });

  const revenueByMonth: Record<string, number> = {};
  orders.forEach((order) => {
    const key = `${order.createdAt.getFullYear()}-${String(order.createdAt.getMonth() + 1).padStart(2, '0')}`;
    revenueByMonth[key] = (revenueByMonth[key] ?? 0) + order.totalAmount;
  });

  sendSuccess(res, revenueByMonth, 'Revenue analytics');
});

// Orders by status
router.get('/orders', isAuth, isAdmin, async (_req: Request, res: Response) => {
  const statuses = [
    'CONFIRMED', 'DESIGN_DISCUSSION', 'MATERIAL_SELECTION', 'MANUFACTURING_STARTED',
    'IN_PRODUCTION', 'QUALITY_CHECK', 'FINAL_MODIFICATIONS', 'PACKAGING',
    'READY_FOR_DISPATCH', 'OUT_FOR_DELIVERY', 'INSTALLATION_SCHEDULED', 'DELIVERED', 'CANCELLED',
  ];

  const counts = await Promise.all(
    statuses.map(async (status) => ({
      status,
      count: await prisma.order.count({ where: { status: status as Parameters<typeof prisma.order.count>[0]['where'] extends { status?: infer S } ? Exclude<S, undefined> : never } }),
    })),
  );

  sendSuccess(res, counts, 'Order analytics');
});

// Top products by revenue
router.get('/top-products', isAuth, isAdmin, async (_req: Request, res: Response) => {
  const topProducts = await prisma.orderItem.groupBy({
    by: ['productId', 'name'],
    _sum: { price: true },
    _count: { productId: true },
    orderBy: { _sum: { price: 'desc' } },
    take: 10,
  });
  sendSuccess(res, topProducts, 'Top products');
});

// New users by week
router.get('/users', isAuth, isAdmin, async (_req: Request, res: Response) => {
  const eightWeeksAgo = new Date();
  eightWeeksAgo.setDate(eightWeeksAgo.getDate() - 56);

  const users = await prisma.user.findMany({
    where: { createdAt: { gte: eightWeeksAgo }, role: 'CUSTOMER' },
    select: { createdAt: true },
  });

  const byWeek: Record<string, number> = {};
  users.forEach((user) => {
    const week = `Week ${Math.ceil(user.createdAt.getDate() / 7)}`;
    const key = `${user.createdAt.getFullYear()}-${String(user.createdAt.getMonth() + 1).padStart(2, '0')}-${week}`;
    byWeek[key] = (byWeek[key] ?? 0) + 1;
  });

  sendSuccess(res, byWeek, 'User analytics');
});

export default router;
