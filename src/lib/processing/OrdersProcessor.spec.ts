import { IProcess } from './../interfaces/IProcess';
import { OrdersProcessor } from './OrdersProcessor';

describe('Test Orders Processor', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  test('Instantiation', () => {
    const instance = new OrdersProcessor(({} as any) as IProcess<any, any>);
    expect(instance).toBeInstanceOf(OrdersProcessor);
    expect(instance).not.toBeUndefined();
  });

  test('Parse Record', () => {
    const instance = new OrdersProcessor(({} as any) as IProcess<any, any>);
    const test = `50154,21.06.1972 02:26,gejgoh@example.com,183528|59.02;729108|89.88;
    177027,20.09.2006 02:02,feuc@example.com,205392|20.3;29300|3.85;147449|87.97;97940|96.67;
    471312,26.10.1993 03:37,vifutoge@example.com,5462|60.93;720057|54.81;715623|49.32;970332|66.73;
    821239,27.02.1996 10:54,okvi@example.com,382721|53.93;926908|74.81;89993|41.12;
    446,08.06.1972 11:23,ukcomel@example.com,402042|80.08;
    131073,29.09.1936 21:47,nimsiw@example.com,406298|65.87;`;
    //const orders: Order[] = instance.parse(test);
    //(orders.length).toBe(6);
  });
});
