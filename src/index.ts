import * as path from 'path';
import { OrdersProcessor } from './lib/parser/OrdersProcessor';
// import { S3Event } from 'aws-lambda';
import * as fs from 'fs';
const csv = fs.readFileSync(path.resolve(__dirname, '../test/output-100000.csv'));

console.time('Load test');
const orders = new OrdersProcessor().parse(csv.toString());
console.timeEnd('Load test');
console.log(orders.length);
if (orders.length) {
  console.info(orders[0].products);
}

// export const handler = async (event: S3Event): Promise<any> => {
//   console.log('Hello World!');
//   const response = JSON.stringify(event, null, 2);
//   return response;
// };
