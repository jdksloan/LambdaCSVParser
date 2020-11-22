import { Order } from './models/Order';
import { IParser } from '../interfaces/IParser';
import { Product } from './models/Product';
import { ProductParser } from './ProductParser';
export class OrderParser implements IParser<string, Order> {
  constructor() {}

  //50154,21.06.1972 02:26,gejgoh@example.com,183528|59.02;729108|89.88;
  parse(raw: string): Order {
    const params = raw.split(',');
    const orderId: number = Number(params[0]);
    const orderDate: string = params[1];
    const userEmail: string = params[2];

    const products: Product[] = [];
    const rawProducts = params[3].split(';');
    const prodParser = new ProductParser();

    for (const product of rawProducts) {
      if (product && product.length) {
        products.push(prodParser.parse(product));
      }
    }

    return new Order(orderId, orderDate, userEmail, products);
  }
}
