import { ApiProcessor } from './lib/processing/ApiProcessor';
import { OrdersProcessor } from './lib/processing/OrdersProcessor';
import { Context, S3Event } from 'aws-lambda';
import { S3Controller } from './lib/storage/S3Controller';

const options = {
  host: 'qgc7c2xwhg.execute-api.eu-central-1.amazonaws.com',
  port: 443,
  headers: {
    'Content-Type': 'application/json',
  },
};

exports.handler = async (event: S3Event, context: Context) => {
  const processor = new ApiProcessor('/Prod/order', options);
  const bkt = event.Records[0].s3.bucket.name;
  const key = event.Records[0].s3.object.key;
  const s3Controller = new S3Controller();
  const doc = await s3Controller.getObject({
    Bucket: bkt,
    Key: key,
  });
  if (doc.Body) {
    await new OrdersProcessor(processor).process(doc.Body.toString());
  }
  return;
};

// import * as path from 'path';
// import { Order } from './lib/parser/models/Order';
// import { ApiProcessor } from './lib/processing/ApiProcessor';
// import { OrdersProcessor } from './lib/processing/OrdersProcessor';
// import * as fs from 'fs';
// const csv = fs.readFileSync(path.resolve(__dirname, '../test/output-2.csv'));

// const options = {
//   host: 'localhost',
//   port: 7779, // or 443 for https
//   headers: {
//     'Content-Type': 'application/json',
//   },
// };

// const processor: ApiProcessor<Order> = new ApiProcessor('/api/v1/test/', options);

// console.time('Load test');
// new OrdersProcessor(processor).process(csv.toString()).then(() => {
//   console.timeEnd('Load test');
// });
