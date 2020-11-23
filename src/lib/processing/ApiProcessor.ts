import { IProcess } from './../interfaces/IProcess';
import * as http from 'http';

export class ApiProcessor<T> implements IProcess<T, Promise<number | undefined>> {
  private _options: {};
  private _path: string;

  constructor(path: string, options: {}) {
    this._path = path;
    this._options = options;
  }

  public async process(data: T): Promise<number | undefined> {
    const path = this._path;
    const put = new Promise<number | undefined>((resolve, reject) => {
      const options = { ...this._options, path, method: 'POST' };
      const req = http.request(options, (res) => {
        let buffer = '';
        res.on('data', (chunk) => (buffer += chunk));
        res.on('end', () => resolve(res.statusCode));
      });
      req.on('error', (e) => reject(e.message));
      req.write(JSON.stringify(data));
      req.end();
    });
    return put;
  }
}
