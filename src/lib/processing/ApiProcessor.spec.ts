import { ApiProcessor } from './ApiProcessor';
import https from 'https';

describe('Test Orders Processor', () => {
  beforeEach(() => {
    console.error = jest.fn();
    https.request = jest
      .fn()
      .mockReturnValue({ on: jest.fn(), write: jest.fn().mockReturnValue(Promise.resolve()), end: jest.fn() });
  });

  test('Instantiation', () => {
    const instance = new ApiProcessor('test', {});
    expect(instance).toBeInstanceOf(ApiProcessor);
    expect(instance).not.toBeUndefined();
  });
});
