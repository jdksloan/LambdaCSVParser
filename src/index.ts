import { ApiProcessor } from './lib/processing/ApiProcessor';
import { OrdersProcessor } from './lib/processing/OrdersProcessor';
import { Context, S3Event } from 'aws-lambda';
import { S3Controller } from './lib/storage/S3Controller';

const options = {
  host: 'qgc7c2xwhg.execute-api.eu-central-1.amazonaws.com',
  port: 443, // or 443 for https
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
