import { FlowUtils } from './../utils/FlowUtils';
import { IProcess } from '../interfaces/IProcess';
import { OrderParser } from '../parser/OrderParser';
import { Order } from '../parser/models/Order';

export class OrdersProcessor implements IProcess<string, Promise<void>> {
  private _processor: IProcess<Order, Promise<any>>;
  private _retryAttempts: number;
  private _orderReport: { fail: number; success: number };

  constructor(processor: IProcess<Order, Promise<any>>, retryAttempts: number = 15) {
    this._processor = processor;
    this._retryAttempts = retryAttempts;
    this._orderReport = { fail: 0, success: 0 };
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
    rawOrders.pop();

    for (const rawOrder of rawOrders) {
      try {
        const order = orderParser.parse(rawOrder);
        await this._put(order);
      } catch (error) {
        console.error(`Failed to parse the order ${rawOrder} with error ${error}`);
      }
    }

    console.info(
      `Order report: orders succeeded: ${this._orderReport.success}, orders failed: ${this._orderReport.fail}`,
    );
  }

  private async _put(order: Order, retry?: number) {
    if (!retry) {
      retry = 0;
    }

    try {
      const result = await this._processor.process(order);
      if (result && result === 200) {
        console.log(`Order: ${order.id} put!`);
        this._orderReport.success++;
        return;
      } else if (retry === this._retryAttempts) {
        console.error(`Failed to put the order ${order.id} with after ${this._retryAttempts} attempts!`);
        this._orderReport.fail++;
        return;
      } else {
        retry++;
        FlowUtils.sleep(50);
        await this._put(order, retry);
      }
    } catch (error) {
      this._orderReport.fail++;
      console.error(`Failed to put the order ${order.id} with error ${error}`);
    }
  }
}
