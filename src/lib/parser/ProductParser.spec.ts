import { Product } from './models/Product';
import { ProductParser } from './ProductParser';

describe('Test Product Parser', () => {
  beforeEach(() => {});

  test('Instantiation', () => {
    const instance = new ProductParser();
    expect(instance).toBeInstanceOf(ProductParser);
    expect(instance).not.toBeUndefined();
  });

  test('Parse Record', () => {
    const instance = new ProductParser();
    const test = '183528|59.02';
    const product: Product = instance.parse(test);
    expect(product.productId).toBe(183528);
    expect(product.total).toBe(59.02);
  });
});
