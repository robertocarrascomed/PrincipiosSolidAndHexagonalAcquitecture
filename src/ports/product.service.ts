import {CreateProduct} from '../adapters/product.create';
import {Product} from '../adapters/product.type';
import {ProductEntity} from '../domain/entities/product.entity';
import {ProductRepository} from '../domain/services/products.respository';

export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async createProduct(product: CreateProduct): Promise<Product> {
    const createProduct = new ProductEntity(product);
    return this.productRepository.createProduct(createProduct.result);
  }

  async getProducts(): Promise<Product[]> {
    return this.productRepository.getProducts();
  }

  async getProductById(id: string): Promise<Product> {
    return this.productRepository.getProductById(id);
  }

  async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    return this.productRepository.updateProduct(id, product);
  }

  async deleteProduct(id: string): Promise<void> {
    return this.productRepository.deleteProduct(id);
  }
}
