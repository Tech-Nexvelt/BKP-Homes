import { Router } from 'express';
import { usersController } from './users.controller';
import { isAuth } from '../../middleware/auth.middleware';
import { isAdmin } from '../../middleware/role.middleware';
import { validate } from '../../middleware/validate.middleware';
import {
  updateProfileSchema,
  changePasswordSchema,
  createAddressSchema,
  updateAddressSchema,
} from './users.validator';

const router = Router();

// Current user routes
router.get('/me', isAuth, (req, res) => usersController.getMe(req, res));
router.patch('/me', isAuth, validate(updateProfileSchema), (req, res) =>
  usersController.updateMe(req, res),
);
router.patch('/me/password', isAuth, validate(changePasswordSchema), (req, res) =>
  usersController.changePassword(req, res),
);
router.delete('/me', isAuth, (req, res) => usersController.deleteMe(req, res));
router.get('/me/recently-viewed', isAuth, (req, res) =>
  usersController.getRecentlyViewed(req, res),
);

// Address routes
router.get('/addresses', isAuth, (req, res) => usersController.getAddresses(req, res));
router.post('/addresses', isAuth, validate(createAddressSchema), (req, res) =>
  usersController.createAddress(req, res),
);
router.patch('/addresses/:id', isAuth, validate(updateAddressSchema), (req, res) =>
  usersController.updateAddress(req, res),
);
router.delete('/addresses/:id', isAuth, (req, res) => usersController.deleteAddress(req, res));
router.patch('/addresses/:id/default', isAuth, (req, res) =>
  usersController.setDefaultAddress(req, res),
);

// Admin routes
router.get('/admin/users', isAuth, isAdmin, (req, res) => usersController.getAllUsers(req, res));
router.get('/admin/users/:id', isAuth, isAdmin, (req, res) =>
  usersController.getUserById(req, res),
);
router.patch('/admin/users/:id/role', isAuth, isAdmin, (req, res) =>
  usersController.updateUserRole(req, res),
);
router.patch('/admin/users/:id/status', isAuth, isAdmin, (req, res) =>
  usersController.updateUserStatus(req, res),
);

export default router;
