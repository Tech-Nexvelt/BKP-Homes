import { Router, Request, Response } from 'express';
import { prisma } from '../../config/database';
import { isAuth } from '../../middleware/auth.middleware';
import { sendSuccess, sendCreated, sendError } from '../../utils/response.utils';

const router = Router();

// Get wishlist
router.get('/', isAuth, async (req: Request, res: Response) => {
  const wishlist = await prisma.wishlist.findMany({
    where: { userId: req.user!.userId },
    include: {
      product: {
        select: { id: true, name: true, slug: true, price: true, salePrice: true, images: true, material: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
  sendSuccess(res, wishlist, 'Wishlist fetched');
});

// Add to wishlist
router.post('/:productId', isAuth, async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { productId } = req.params;

  const existing = await prisma.wishlist.findUnique({
    where: { userId_productId: { userId, productId } },
  });

  if (existing) {
    sendError(res, 'Product already in wishlist', 409);
    return;
  }

  const item = await prisma.wishlist.create({
    data: { userId, productId },
    include: { product: { select: { name: true, price: true, images: true } } },
  });
  sendCreated(res, item, 'Added to wishlist');
});

// Remove from wishlist
router.delete('/:productId', isAuth, async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { productId } = req.params;

  await prisma.wishlist.deleteMany({ where: { userId, productId } });
  sendSuccess(res, null, 'Removed from wishlist');
});

export default router;
