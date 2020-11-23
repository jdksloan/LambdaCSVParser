import { OrderLine } from './models/OrderLine';
import { OrderLinesParser } from './OrderLinesParser';

describe('Test Products Parser', () => {
  beforeEach(() => {});

  test('Instantiation', () => {
    const instance = new OrderLinesParser();
    expect(instance).toBeInstanceOf(OrderLinesParser);
    expect(instance).not.toBeUndefined();
  });

  test('Parse Record', () => {
    const instance = new OrderLinesParser();
    const test = '183528|59.02;729108|89.88;';
    const product: { total: number; orderLines: OrderLine[] } = instance.parse(test);
    expect(product.orderLines.length).toBe(2);
    expect(product.total).toBe(148.9);
  });
});
