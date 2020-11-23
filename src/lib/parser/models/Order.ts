import { OrderLine } from './OrderLine';

export class Order {
  public id: string;
  public email: string;
  public orderDate: string;
  public total: Number;
  public orderLines: OrderLine[];

  /**
   * Creates an instance of Order.
   * @param {string} id
   * @param {string} email
   * @param {string} orderDate
   * @param {Number} total
   * @param {OrderLine[]} orderLines
   * @memberof Order
   */
  constructor(id: string, email: string, orderDate: string, total: Number, orderLines: OrderLine[]) {
    this.id = id;
    this.orderDate = orderDate;
    this.email = email;
    this.total = total;
    this.orderLines = orderLines;
  }
}
