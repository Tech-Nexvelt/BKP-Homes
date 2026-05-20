import { productsRepository } from './products.repository';
import { HttpError } from '../../middleware/error.middleware';
import { getPagination, buildPaginationMeta } from '../../utils/pagination.utils';
import type { CreateProductInput, UpdateProductInput, ProductQueryInput } from './products.validator';

const slugify = (text: string): string =>
  text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export class ProductsService {
  async getAll(query: ProductQueryInput) {
    const { skip, take, page, limit } = getPagination(query.page, query.limit);

    const where: Record<string, unknown> = { isActive: true };

    if (query.q) {
      where['OR'] = [
        { name: { contains: query.q, mode: 'insensitive' } },
        { description: { contains: query.q, mode: 'insensitive' } },
        { tags: { has: query.q } },
      ];
    }

    if (query.category) {
      where['category'] = { slug: query.category };
    }

    if (query.minPrice || query.maxPrice) {
      where['price'] = {
        ...(query.minPrice && { gte: parseFloat(query.minPrice) }),
        ...(query.maxPrice && { lte: parseFloat(query.maxPrice) }),
      };
    }

    if (query.material) {
      where['material'] = { contains: query.material, mode: 'insensitive' };
    }

    if (query.featured === 'true') {
      where['isFeatured'] = true;
    }

    const orderByMap: Record<string, Record<string, string>> = {
      price_asc: { price: 'asc' },
      price_desc: { price: 'desc' },
      newest: { createdAt: 'desc' },
      oldest: { createdAt: 'asc' },
    };

    const orderBy = query.sort ? orderByMap[query.sort] ?? { createdAt: 'desc' } : { createdAt: 'desc' };

    const { products, total } = await productsRepository.findAll({ skip, take, where, orderBy });
    return { products, pagination: buildPaginationMeta(total, page, limit) };
  }

  async getBySlug(slug: string) {
    const product = await productsRepository.findBySlug(slug);
    if (!product) throw new HttpError('Product not found', 404);
    return product;
  }

  async getFeatured() {
    return productsRepository.findFeatured();
  }

  async getRelated(productId: string, categoryId: string) {
    return productsRepository.findRelated(productId, categoryId);
  }

  async create(data: CreateProductInput) {
    const slug = data.slug || slugify(data.name);

    const slugTaken = await productsRepository.slugExists(slug);
    const finalSlug = slugTaken ? `${slug}-${Date.now()}` : slug;

    return productsRepository.create({ ...data, slug: finalSlug });
  }

  async update(id: string, data: UpdateProductInput) {
    const existing = await productsRepository.findById(id);
    if (!existing) throw new HttpError('Product not found', 404);

    if (data.slug) {
      const slugTaken = await productsRepository.slugExists(data.slug, id);
      if (slugTaken) throw new HttpError('Slug already in use', 409);
    }

    return productsRepository.update(id, data);
  }

  async delete(id: string) {
    const existing = await productsRepository.findById(id);
    if (!existing) throw new HttpError('Product not found', 404);
    await productsRepository.delete(id);
    return { message: 'Product deleted' };
  }
}

export const productsService = new ProductsService();
