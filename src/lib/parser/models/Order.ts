import { Product } from './Product';

export class Order {
  public orderId: number;
  public orderDate: string;
  public userEmail: string;
  public products: Product[];
  constructor(orderId: number, orderDate: string, userEmail: string, products: Product[]) {
    this.orderId = orderId;
    this.orderDate = orderDate;
    this.userEmail = userEmail;
    this.products = products;
  }
}
