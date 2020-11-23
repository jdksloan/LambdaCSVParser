import { ApiProcessor } from './ApiProcessor';

describe('Test Orders Processor', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  test('Instantiation', () => {
    const instance = new ApiProcessor('test', {});
    expect(instance).toBeInstanceOf(ApiProcessor);
    expect(instance).not.toBeUndefined();
  });
});
