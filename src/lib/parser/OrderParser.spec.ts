import { Order } from './models/Order';
import { OrderParser } from './OrderParser';
describe('Test Order Parser', () => {
  beforeEach(() => {});

  test('Instantiation', () => {
    const instance = new OrderParser();
    expect(instance).toBeInstanceOf(OrderParser);
    expect(instance).not.toBeUndefined();
  });

  test('Parse Record', async () => {
    const instance = new OrderParser();
    const test = '50154,21.06.1972 02:26,gejgoh@example.com,183528|59.02;729108|89.88;';
    const order: Order = await instance.parse(test);
    console.info(order);
    expect(order.id).toBe('50154');
    expect(order.orderDate).toBe('21.06.1972 02:26');
    expect(order.email).toBe('gejgoh@example.com');
    expect(order.orderLines.length).toBe(2);
  });
});
