import { z } from 'zod';

const variantSchema = z.object({
  color: z.string().optional(),
  material: z.string().optional(),
  finish: z.string().optional(),
  dimensions: z.string().optional(),
  priceModifier: z.number().default(0),
  stock: z.number().int().min(0).default(0),
  images: z.array(z.string()).default([]),
});

export const createProductSchema = z.object({
  name: z.string().min(2).max(200).trim(),
  slug: z.string().min(2).max(200).regex(/^[a-z0-9-]+$/).optional(),
  description: z.string().min(10),
  price: z.number().positive('Price must be positive'),
  salePrice: z.number().positive().optional(),
  categoryId: z.string().min(1, 'Category is required'),
  images: z.array(z.string()).min(1, 'At least one image is required'),
  stock: z.number().int().min(0).default(0),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
  material: z.string().optional(),
  dimensions: z.string().optional(),
  weight: z.number().positive().optional(),
  tags: z.array(z.string()).default([]),
  variants: z.array(variantSchema).default([]),
});

export const updateProductSchema = createProductSchema.partial();

export const productQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  material: z.string().optional(),
  color: z.string().optional(),
  rating: z.string().optional(),
  sort: z.enum(['price_asc', 'price_desc', 'newest', 'oldest', 'popular']).optional(),
  q: z.string().optional(),
  featured: z.string().optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type ProductQueryInput = z.infer<typeof productQuerySchema>;
