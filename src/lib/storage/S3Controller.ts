import S3 from 'aws-sdk/clients/s3';
import { AWSError } from 'aws-sdk/lib/error';
import { PromiseResult } from 'aws-sdk/lib/request';

export class S3Controller {
  private _s3: S3;

  // {
  //   accessKeyId: '/* access key here */',
  //   secretAccessKey: '/* secret key here */',
  //   region: '/* region here */',
  // }
  constructor(options?: S3.ClientConfiguration) {
    this._s3 = new S3(options);
  }

  public async getObject(params: S3.Types.GetObjectRequest): Promise<PromiseResult<S3.GetObjectOutput, AWSError>> {
    return this._s3.getObject(params).promise();
  }
}
