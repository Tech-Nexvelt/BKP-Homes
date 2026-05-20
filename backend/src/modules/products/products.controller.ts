import { Request, Response } from 'express';
import { productsService } from './products.service';
import { sendSuccess, sendCreated } from '../../utils/response.utils';
import type { CreateProductInput, UpdateProductInput, ProductQueryInput } from './products.validator';

export class ProductsController {
  async getAll(req: Request, res: Response): Promise<void> {
    const query = req.query as unknown as ProductQueryInput;
    const result = await productsService.getAll(query);
    sendSuccess(res, result.products, 'Products fetched', 200, result.pagination);
  }

  async getBySlug(req: Request, res: Response): Promise<void> {
    const product = await productsService.getBySlug(req.params['slug']!);
    sendSuccess(res, product, 'Product fetched');
  }

  async getFeatured(req: Request, res: Response): Promise<void> {
    const products = await productsService.getFeatured();
    sendSuccess(res, products, 'Featured products fetched');
  }

  async getRelated(req: Request, res: Response): Promise<void> {
    const product = await productsService.getBySlug(req.params['id']!);
    const related = await productsService.getRelated(product.id, product.categoryId);
    sendSuccess(res, related, 'Related products fetched');
  }

  async create(req: Request, res: Response): Promise<void> {
    const data = req.body as CreateProductInput;
    const product = await productsService.create(data);
    sendCreated(res, product, 'Product created');
  }

  async update(req: Request, res: Response): Promise<void> {
    const data = req.body as UpdateProductInput;
    const product = await productsService.update(req.params['id']!, data);
    sendSuccess(res, product, 'Product updated');
  }

  async delete(req: Request, res: Response): Promise<void> {
    const result = await productsService.delete(req.params['id']!);
    sendSuccess(res, result, result.message);
  }
}

export const productsController = new ProductsController();
