import { FlowUtils } from './../flow/FlowUtils';
import { IProcess } from '../interfaces/IProcess';
import { OrderParser } from '../parser/OrderParser';
import { Order } from '../parser/models/Order';
import { IncomingMessage } from 'http';

export class OrdersProcessor implements IProcess<string, Promise<void>> {
  private _processor: IProcess<Order, Promise<IncomingMessage>>;
  private _retryAttempts: number;
  private _orderReport: { fail: number; success: number; total: number };

  constructor(processor: IProcess<Order, Promise<IncomingMessage>>, retryAttempts: number = 10) {
    this._processor = processor;
    this._retryAttempts = retryAttempts;
    this._orderReport = { fail: 0, success: 0, total: 0 };
  }

  /**
   * Processes a raw string of orders
   *
   * @param {string} raw
   * @return {*}  {Promise<void>}
   * @memberof OrdersProcessor
   */
  public async process(raw: string): Promise<void> {
    const rawOrders = raw.split('\n');
    const orderParser: OrderParser = new OrderParser();

    for (const rawOrder of rawOrders) {
      if (!rawOrder) {
        continue;
      }
      try {
        const order = orderParser.parse(rawOrder);
        await this.put(order);
      } catch (error) {
        console.error(`Failed to parse the order ${rawOrder} with error ${error}`);
      } finally {
        this._orderReport.total++;
      }
    }

    console.info(
      `Order report - total orders: ${this._orderReport.total}, orders succeeded: ${this._orderReport.success}, orders failed: ${this._orderReport.fail}`,
    );
  }

  /**
   * Puts the orders to the external API
   *
   * @private
   * @param {Order} order
   * @param {number} [retry]
   * @return {*}  {Promise<void>}
   * @memberof OrdersProcessor
   */
  private async put(order: Order, retry?: number): Promise<void> {
    if (!retry) {
      retry = 0;
    }

    try {
      const result = await this._processor.process(order);
      if (result.statusCode === 201) {
        console.log(`Order: ${order.id} put!`);
        this._orderReport.success++;
        return;
      } else if (retry === this._retryAttempts) {
        console.error(`Failed to put the order ${order.id} with after ${this._retryAttempts} attempts!`);
        this._orderReport.fail++;
        return;
      } else if (result.statusCode === 429) {
        await FlowUtils.sleep(Number(result.headers['retry-after']));
      }
      retry++;
      await this.put(order, retry);
    } catch (error) {
      this._orderReport.fail++;
      console.error(`Failed to put the order ${order.id} with error ${error}`);
    }
  }
}
