import { Router } from 'express';
import { productsController } from './products.controller';
import { isAuth } from '../../middleware/auth.middleware';
import { isAdmin } from '../../middleware/role.middleware';
import { validate } from '../../middleware/validate.middleware';
import {
  createProductSchema,
  updateProductSchema,
  productQuerySchema,
} from './products.validator';

const router = Router();

router.get('/', validate(productQuerySchema, 'query'), (req, res) =>
  productsController.getAll(req, res),
);
router.get('/featured', (req, res) => productsController.getFeatured(req, res));
router.get('/:slug', (req, res) => productsController.getBySlug(req, res));
router.get('/:id/related', (req, res) => productsController.getRelated(req, res));

router.post('/', isAuth, isAdmin, validate(createProductSchema), (req, res) =>
  productsController.create(req, res),
);
router.patch('/:id', isAuth, isAdmin, validate(updateProductSchema), (req, res) =>
  productsController.update(req, res),
);
router.delete('/:id', isAuth, isAdmin, (req, res) => productsController.delete(req, res));

export default router;
