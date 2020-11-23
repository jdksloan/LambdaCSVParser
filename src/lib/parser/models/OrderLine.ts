export class OrderLine {
  public productCode: string;
  public value: number;

  /**
   * Creates an instance of OrderLine.
   * @param {string} productCode
   * @param {number} value
   * @memberof OrderLine
   */
  constructor(productCode: string, value: number) {
    this.productCode = productCode;
    this.value = value;
  }
}
