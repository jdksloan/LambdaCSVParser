import { OrderParser } from './OrderParser';
import { Order } from './models/Order';
import { IParser } from '../interfaces/IParser';

export class OrdersProcessor implements IParser<string, Order[]> {
  constructor() {}

  //50154,21.06.1972 02:26,gejgoh@example.com,183528|59.02;729108|89.88;
  parse(raw: string): Order[] {
    const orders: Order[] = [];
    const rawOrders = raw.split('\n');
    const orderParser: OrderParser = new OrderParser();
    for (const order of rawOrders) {
      orders.push(orderParser.parse(order));
    }

    return orders;
  }
}
