import { browser, $, by } from 'protractor';
import { PendingPoolRecordPage } from './pending-pool';


describe('Pending Pool', () => {
  const pendingPool = new PendingPoolRecordPage();
  const expectedConditions = browser.ExpectedConditions;
  beforeAll(() => {
    pendingPool.navigateToPendingPoolPage();
  });
  it('Should be in all pending pool page', () => {
    browser.driver.wait(
      expectedConditions.visibilityOf(pendingPool.getPoolBody()), 5000);
    expect(pendingPool.getBodyContent().get(0)).toBeTruthy();
  });
});
