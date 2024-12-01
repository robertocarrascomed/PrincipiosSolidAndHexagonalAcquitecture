import {Product} from './product.type';

export type CreateProduct = Omit<Product, 'id'>;
