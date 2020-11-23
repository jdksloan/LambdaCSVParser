import { OrderLine } from './models/OrderLine';
import { OrderLineParser } from './OrderLineParser';

describe('Test OrderLine Parser', () => {
  beforeEach(() => {});

  test('Instantiation', () => {
    const instance = new OrderLineParser();
    expect(instance).toBeInstanceOf(OrderLineParser);
    expect(instance).not.toBeUndefined();
  });

  test('Parse Record', () => {
    const instance = new OrderLineParser();
    const test = '183528|59.02';
    const product: OrderLine = instance.parse(test);
    expect(product.productCode).toBe('183528');
    expect(product.value).toBe(59.02);
  });
});
