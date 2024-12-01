import {ProductRepository} from '../../domain/services/products.respository';
import {Product} from '../product.type';

export class InMemoryProductRepository implements ProductRepository {
  private storage = new Map<string, Product>();

  async createProduct(product: Product): Promise<Product> {
    this.storage.set(product.id, product);
    return await this.getProductById(product.id);
  }
  async getProducts(): Promise<Product[]> {
    if (this.storage.size === 0) return [];
    return Array.from(this.storage.values());
  }
  async getProductById(id: string): Promise<Product> {
    try {
      const product = this.storage.get(id);
      if (!product) throw new Error('Not Found Product');
      return product;
    } catch (error) {
      throw new Error('Error in getProductById');
    }
  }
  async updateProduct(id: string, update: Partial<Product>): Promise<Product> {
    const product = await this.getProductById(id);
    this.storage.set(id, {
      ...product,
      ...update,
    });
    return await this.getProductById(id);
  }
  async deleteProduct(id: string): Promise<void> {
    if (await this.getProductById(id)) {
      this.storage.delete(id);
    }
  }
}
