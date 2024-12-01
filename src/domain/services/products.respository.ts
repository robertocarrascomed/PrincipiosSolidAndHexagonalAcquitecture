import {Product} from '../../adapters/product.type';

export interface ProductRepository {
  createProduct(product: Product): Promise<Product>;
  getProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product>;
  updateProduct(id: string, product: Partial<Product>): Promise<Product>;
  deleteProduct(id: string): Promise<void>;
}
