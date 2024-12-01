import {CreateProduct} from '../../adapters/product.create';
import {Product} from '../../adapters/product.type';

import {v4 as uuidv4} from 'uuid';

export class ProductEntity {
  constructor(public product: CreateProduct) {}

  public get result(): Product {
    return {
      id: uuidv4(),
      ...this.product,
    };
  }
}
