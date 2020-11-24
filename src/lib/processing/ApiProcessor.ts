import { IProcess } from './../interfaces/IProcess';
import https from 'https';
import { IncomingMessage } from 'http';

export class ApiProcessor<T> implements IProcess<T, Promise<IncomingMessage>> {
  private _options: {};
  private _path: string;

  constructor(path: string, options: {}) {
    this._path = path;
    this._options = options;
  }

  public async process(data: T): Promise<IncomingMessage> {
    const path = this._path;
    const put = new Promise<IncomingMessage>((resolve, reject) => {
      const options = { ...this._options, path, method: 'PUT' };
      const req = https.request(options, (res) => {
        let buffer = '';
        res.on('data', (chunk) => (buffer += chunk));
        res.on('end', () => {
          resolve(res);
        });
      });
      req.on('error', (e) => reject(e.message));
      req.write(JSON.stringify(data));
      req.end();
    });
    return put;
  }
}
