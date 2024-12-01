import {Product} from '../adapters/product.type';
import {ProductRepository} from '../domain/services/products.respository';

interface SimulateApiCall<T> {
  func: () => Promise<T>;
  delay?: number;
}

export class RemoteProductRepository implements ProductRepository {
  private storage = new Map<string, Product>();

  private async simulateApiCall<T>({
    func,
    delay = 1000,
  }: SimulateApiCall<T>): Promise<T> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(func());
      }, delay);
    });
  }

  async createProduct(product: Product): Promise<Product> {
    const action = async () => {
      this.storage.set(product.id, product);
      return await this.getProductById(product.id);
    };
    return await this.simulateApiCall<Product>({
      func: action,
    });
  }
  async getProducts(): Promise<Product[]> {
    const action = async () => {
      if (this.storage.size === 0) return [];
      return Array.from(this.storage.values());
    };
    return await this.simulateApiCall<Product[]>({
      func: action,
    });
  }
  async getProductById(id: string): Promise<Product> {
    const action = async () => {
      const product = this.storage.get(id);
      if (!product) throw new Error('Not Found Product');
      return product;
    };

    try {
      return await this.simulateApiCall<Product>({
        func: action,
      });
    } catch (error) {
      throw new Error('Error in getProductById');
    }
  }
  async updateProduct(id: string, update: Partial<Product>): Promise<Product> {
    const action = async () => {
      const product = await this.getProductById(id);
      this.storage.set(id, {
        ...product,
        ...update,
      });
      return await this.getProductById(id);
    };
    return await this.simulateApiCall<Product>({
      func: action,
    });
  }
  async deleteProduct(id: string): Promise<void> {
    const action = async () => {
      if (await this.getProductById(id)) {
        this.storage.delete(id);
      }
    };
    return await this.simulateApiCall<void>({
      func: action,
    });
  }
}
