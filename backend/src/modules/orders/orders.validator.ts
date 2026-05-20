import { z } from 'zod';

const orderItemSchema = z.object({
  productId: z.string().min(1),
  variantId: z.string().optional(),
  qty: z.number().int().positive('Quantity must be at least 1'),
  price: z.number().positive(),
  name: z.string(),
  image: z.string().optional(),
});

export const createOrderSchema = z.object({
  items: z.array(orderItemSchema).min(1, 'At least one item is required'),
  addressId: z.string().min(1, 'Delivery address is required'),
  totalAmount: z.number().positive(),
  discount: z.number().min(0).default(0),
  tax: z.number().min(0).default(0),
  paymentId: z.string().optional(),
  paymentMethod: z.string().optional(),
  notes: z.string().max(500).optional(),
  estimatedDelivery: z.string().datetime().optional(),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum([
    'CONFIRMED', 'DESIGN_DISCUSSION', 'MATERIAL_SELECTION', 'MANUFACTURING_STARTED',
    'IN_PRODUCTION', 'QUALITY_CHECK', 'FINAL_MODIFICATIONS', 'PACKAGING',
    'READY_FOR_DISPATCH', 'OUT_FOR_DELIVERY', 'INSTALLATION_SCHEDULED', 'DELIVERED', 'CANCELLED',
  ]),
  note: z.string().optional(),
  estimatedDelivery: z.string().datetime().optional(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
