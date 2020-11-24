import { FlowUtils } from './FlowUtils';

describe('Test FlowUtils', () => {
  test('sleep 1 ms', async () => {
    const date = Date.now();
    await FlowUtils.sleep(1);
    const dateAfter = Date.now();
    expect(dateAfter).toBeGreaterThan(date);
  });
});
