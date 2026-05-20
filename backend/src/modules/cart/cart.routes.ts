import { Router, Request, Response } from 'express';
import { prisma } from '../../config/database';
import { isAuth } from '../../middleware/auth.middleware';
import { sendSuccess, sendCreated } from '../../utils/response.utils';
import { z } from 'zod';
import { validate } from '../../middleware/validate.middleware';

const addToCartSchema = z.object({
  productId: z.string().min(1),
  variantId: z.string().optional(),
  qty: z.number().int().positive().default(1),
});

const updateCartItemSchema = z.object({
  qty: z.number().int().positive(),
});

const router = Router();

// Get cart
router.get('/', isAuth, async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            select: { id: true, name: true, slug: true, price: true, salePrice: true, images: true, stock: true },
          },
        },
      },
    },
  });
  sendSuccess(res, cart ?? { items: [] }, 'Cart fetched');
});

// Add to cart
router.post('/add', isAuth, validate(addToCartSchema), async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { productId, variantId, qty } = req.body as { productId: string; variantId?: string; qty: number };

  let cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) {
    cart = await prisma.cart.create({ data: { userId } });
  }

  const existing = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId, variantId },
  });

  let item;
  if (existing) {
    item = await prisma.cartItem.update({
      where: { id: existing.id },
      data: { qty: existing.qty + qty },
      include: { product: { select: { name: true, price: true, images: true } } },
    });
  } else {
    item = await prisma.cartItem.create({
      data: { cartId: cart.id, productId, variantId, qty },
      include: { product: { select: { name: true, price: true, images: true } } },
    });
  }

  sendCreated(res, item, 'Added to cart');
});

// Update cart item qty
router.patch('/item/:id', isAuth, validate(updateCartItemSchema), async (req: Request, res: Response) => {
  const { qty } = req.body as { qty: number };
  const item = await prisma.cartItem.update({
    where: { id: req.params['id'] },
    data: { qty },
  });
  sendSuccess(res, item, 'Cart updated');
});

// Remove cart item
router.delete('/item/:id', isAuth, async (req: Request, res: Response) => {
  await prisma.cartItem.delete({ where: { id: req.params['id'] } });
  sendSuccess(res, null, 'Item removed from cart');
});

// Clear cart
router.delete('/clear', isAuth, async (req: Request, res: Response) => {
  const cart = await prisma.cart.findUnique({ where: { userId: req.user!.userId } });
  if (cart) {
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  }
  sendSuccess(res, null, 'Cart cleared');
});

export default router;
