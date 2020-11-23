import { Queue } from '../data/Queue';
import { IProcess } from '../interfaces/IProcess';
import { OrderParser } from '../parser/OrderParser';
import { Order } from '../parser/models/Order';

export class OrdersProcessor implements IProcess<string, Promise<void>> {
  private _processor: IProcess<Order, Promise<any>>;

  constructor(processor: IProcess<Order, Promise<any>>) {
    this._processor = processor;
  }
  /**
   * Parses an array of orders
   * @param {string} raw
   * @return {*}  {Order[]}
   * @memberof OrdersParser
   */
  public async process(raw: string): Promise<void> {
    const rawOrders = raw.split('\n');
    const orderParser: OrderParser = new OrderParser();
    rawOrders.pop();
    const orders: Queue<string> = new Queue(...rawOrders);
    let processed = 0;

    while (!orders.empty) {
      const next = orders.dequeue();

      if (!next) {
        break;
      }

      try {
        const order = orderParser.parse(next);
        try {
          const result = await this._processor.process(order);

          if (result) {
            if (result === 200) {
              processed++;
            } else if (result === 429) {
              orders.enqueue(next);
            } else {
              console.error(`Failed to put the order ${next}`);
            }
          }
        } catch (error) {
          console.error(`Failed to put the order ${next} with error ${error}`);
        }
      } catch (error) {
        console.error(`Failed to parse the order ${next} with error ${error}`);
      }
    }

    console.info(`${processed} orders processed`);
  }
}
