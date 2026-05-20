import { Router } from 'express';
import { ordersController } from './orders.controller';
import { isAuth } from '../../middleware/auth.middleware';
import { isAdmin } from '../../middleware/role.middleware';
import { validate } from '../../middleware/validate.middleware';
import { createOrderSchema, updateOrderStatusSchema } from './orders.validator';

const router = Router();

// Customer routes
router.post('/', isAuth, validate(createOrderSchema), (req, res) =>
  ordersController.create(req, res),
);
router.get('/', isAuth, (req, res) => ordersController.getMyOrders(req, res));
router.get('/:id', isAuth, (req, res) => ordersController.getMyOrderById(req, res));
router.get('/:id/tracking', isAuth, (req, res) => ordersController.getOrderTracking(req, res));

// Admin routes
router.get('/admin/orders', isAuth, isAdmin, (req, res) =>
  ordersController.getAllOrders(req, res),
);
router.get('/admin/orders/:id', isAuth, isAdmin, (req, res) =>
  ordersController.getAdminOrderById(req, res),
);
router.patch(
  '/admin/orders/:id/status',
  isAuth,
  isAdmin,
  validate(updateOrderStatusSchema),
  (req, res) => ordersController.updateStatus(req, res),
);
router.post('/admin/orders/:id/tracking', isAuth, isAdmin, (req, res) =>
  ordersController.addTrackingNote(req, res),
);

export default router;
