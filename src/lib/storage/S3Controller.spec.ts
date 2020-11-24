import { S3Controller } from './S3Controller';

describe('Test Orders Processor', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  test('Instantiation', () => {
    const instance = new S3Controller({});
    expect(instance).toBeInstanceOf(S3Controller);
    expect(instance).not.toBeUndefined();
  });
});
