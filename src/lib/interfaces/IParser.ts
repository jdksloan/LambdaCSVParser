export interface IParser<T, R> {
  parse(raw: T): R;
}
