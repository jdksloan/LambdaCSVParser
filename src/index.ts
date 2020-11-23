import { Order } from 'lib/parser/models/Order';
import { ApiProcessor } from './lib/processing/ApiProcessor';
import { OrdersProcessor } from './lib/processing/OrdersProcessor';
import * as path from 'path';

// import { S3Event } from 'aws-lambda';
import * as fs from 'fs';
const csv = fs.readFileSync(path.resolve(__dirname, '../test/output-2.csv'));
//const url = 'https://qgc7c2xwhg.execute-api.eucentral-1.amazonaws.com/Prod/order';

const options = {
  host: 'localhost',
  port: 7779, // or 443 for https
  headers: {
    'Content-Type': 'application/json',
  },
};

const processor: ApiProcessor<Order> = new ApiProcessor('/api/v1/test/', options);

console.time('Load test');
new OrdersProcessor(processor).process(csv.toString()).then(() => {
  console.timeEnd('Load test');
});

// console.log(orders.length);
// if (orders.length) {
//   console.info(orders[49]);
// }

// export const handler = async (event: S3Event): Promise<any> => {
//   console.log('Hello World!');
//   const response = JSON.stringify(event, null, 2);
//   return response;
// };
