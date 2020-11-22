import { Order } from './models/Order';
import { OrderParser } from './OrderParser';
describe('Test Order Parser', () => {
  beforeEach(() => {});

  test('Instantiation', () => {
    const instance = new OrderParser();
    expect(instance).toBeInstanceOf(OrderParser);
    expect(instance).not.toBeUndefined();
  });

  test('Parse Record', () => {
    const instance = new OrderParser();
    const test = '50154,21.06.1972 02:26,gejgoh@example.com,183528|59.02;729108|89.88;';
    const order: Order = instance.parse(test);
    console.info(order);
    expect(order.orderId).toBe(50154);
    expect(order.orderDate).toBe('21.06.1972 02:26');
    expect(order.userEmail).toBe('gejgoh@example.com');
    expect(order.products.length).toBe(2);
  });
});
