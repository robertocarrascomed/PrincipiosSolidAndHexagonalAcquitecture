import {CreateProduct} from './adapters/product.create';
import {InMemoryProductRepository} from './adapters/savers/inMemoryRepository';
import {RemoteProductRepository} from './ports/RemoteProductRepository';
import {ProductService} from './ports/product.service';

async function inMemoryProductRepository() {
  const product1: CreateProduct = {
    name: 'Product One',
    price: 23,
    description: 'Some description',
    stock: 1265,
  };

  const product2: CreateProduct = {
    name: 'Product Two',
    price: 234,
    description: 'Some description Two',
    stock: 723,
  };

  const inMemoryProductRepository = new InMemoryProductRepository();
  const productService = new ProductService(inMemoryProductRepository);
  const createProduct1 = await productService.createProduct(product1);
  const productById = await productService.getProductById(createProduct1.id);
  const productById2 = await productService.createProduct(product2);
  const productByIdTwo = await productService.getProductById(productById2.id);

  console.group(
    'Hexagonal Architecture InMemoryProductRepository ====================================',
  );
  console.log('====================================');
  console.log('The first in memory product is created');
  console.log(productById);
  console.log('The second in memory product is created');
  console.log(productByIdTwo);
  const updateProductTwo = await productService.updateProduct(
    productByIdTwo.id,
    {
      description: 'Better description',
      stock: 10,
    },
  );
  console.log('The second in memory product is updated');
  console.log(updateProductTwo);
  console.log('====================================');
  console.groupEnd();
}

async function remoteProductRepository() {
  const product1: CreateProduct = {
    name: 'Remote Product One',
    price: 12,
    description: 'Some description',
    stock: 1265,
  };

  const product2: CreateProduct = {
    name: 'Remote Product Two',
    price: 23,
    description: 'Some description for Remote Two',
    stock: 723,
  };

  const remoteProductRepository = new RemoteProductRepository();
  const productService = new ProductService(remoteProductRepository);
  const createProduct1 = await productService.createProduct(product1);
  const productById = await productService.getProductById(createProduct1.id);

  console.group(
    'Hexagonal Architecture RemoteProductRepository ====================================',
  );
  console.log('====================================');
  console.log('The first remote product is created');
  console.log(productById);

  const productById2 = await productService.createProduct(product2);
  const productByIdTwo = await productService.getProductById(productById2.id);

  console.log('The second remote product is created');
  console.log(productByIdTwo);
  const updateProductTwo = await productService.updateProduct(
    productByIdTwo.id,
    {
      description: 'Better description for Remote',
      stock: 500,
    },
  );
  console.log('The second remote product is updated');
  console.log(updateProductTwo);

  const allProduct = await productService.getProducts();

  console.log('====================================');
  console.log('All remote products are obtained');
  console.log(allProduct);
  console.log('====================================');
  console.groupEnd();
}

export async function hexagonalArchitecture() {
  await inMemoryProductRepository();
  await remoteProductRepository();
}
