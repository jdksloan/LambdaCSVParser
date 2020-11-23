import { OrderLine } from './models/OrderLine';
import { IParser } from '../interfaces/IParser';
export class OrderLineParser implements IParser<string, OrderLine> {
  /**
   * Processes a single order line
   *
   * @param {string} raw
   * Example: '183528|59.02'
   * @return {*}  {OrderLine}
   * @memberof OrderLineParser
   */
  parse(raw: string): OrderLine {
    const params = raw.split('|');
    const productCode: string = params[0];
    const total: number = Number(params[1]);

    return new OrderLine(productCode, total);
  }
}
