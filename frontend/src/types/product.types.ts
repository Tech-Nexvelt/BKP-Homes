export interface ProductVariant {
  id: string;
  productId: string;
  color?: string;
  material?: string;
  finish?: string;
  dimensions?: string;
  priceModifier: number;
  stock: number;
  images: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  parent?: Category;
  children?: Category[];
  sortOrder: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number;
  categoryId: string;
  category?: Category;
  images: string[];
  variants?: ProductVariant[];
  stock: number;
  isFeatured: boolean;
  isActive: boolean;
  material?: string;
  dimensions?: string;
  weight?: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  _avg?: { rating?: number };
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  title?: string;
  comment: string;
  images: string[];
  isVerified: boolean;
  createdAt: string;
  user?: { name: string; avatar?: string };
}

export interface ProductFilters {
  categoryId?: string;
  q?: string;
  minPrice?: number;
  maxPrice?: number;
  material?: string;
  isFeatured?: boolean;
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'popular';
  page?: number;
  limit?: number;
}
