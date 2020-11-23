export interface IProcess<T, R> {
  process(data: T): R;
}
