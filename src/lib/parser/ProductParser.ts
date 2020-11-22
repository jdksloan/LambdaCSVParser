import { Product } from './models/Product';
import { IParser } from '../interfaces/IParser';
export class ProductParser implements IParser<string, Product> {
  constructor() {}

  //183528|59.02
  parse(raw: string): Product {
    const params = raw.split('|');
    const productId: number = Number(params[0]);
    const total: number = Number(params[1]);

    return new Product(productId, total);
  }
}
