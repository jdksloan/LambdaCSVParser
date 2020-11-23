import { OrderLinesParser } from './OrderLinesParser';
import { OrderLine } from './models/OrderLine';
import { Order } from './models/Order';
import { IParser } from '../interfaces/IParser';

export class OrderParser implements IParser<string, Order> {
  /**
   * Parses a single order
   *
   * @param {string} raw
   * Example: '50154,21.06.1972 02:26,gejgoh@example.com,183528|59.02;729108|89.88;'
   * @return {*}  {Order}
   * @memberof OrderParser
   */
  public parse(raw: string): Order {
    const params = raw.split(',');
    const id: string = params[0];
    const orderDate: string = params[1];
    const email: string = params[2];
    const orderLineTotal: { total: number; orderLines: OrderLine[] } = new OrderLinesParser().parse(params[3]);
    const order = new Order(id, email, orderDate, orderLineTotal.total, orderLineTotal.orderLines);
    return order;
  }
}
