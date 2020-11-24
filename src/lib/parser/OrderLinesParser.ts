import { OrderLine } from './models/OrderLine';
import { IParser } from '../interfaces/IParser';
import { OrderLineParser } from './OrderLineParser';
export class OrderLinesParser implements IParser<string, { total: number; orderLines: OrderLine[] }> {
  /**
   * Parses an array of Order Lines
   *
   * @param {string} raw
   * Example: '183528|59.02;729108|89.88;'
   * @return {*}  {{ total: number; orderLines: OrderLine[] }}
   * @memberof OrderLinesParser
   */
  parse(raw: string): { total: number; orderLines: OrderLine[] } {
    const orderLines: OrderLine[] = [];
    const rawProducts = raw.split(';');
    const prodParser = new OrderLineParser();
    let total: number = 0;

    for (const product of rawProducts) {
      if (!product) {
        continue;
      }
      const parsedProduct = prodParser.parse(product);
      orderLines.push(parsedProduct);
      total += parsedProduct.value;
    }
    return { total, orderLines };
  }
}
