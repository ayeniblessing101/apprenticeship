import { browser, element, by } from 'protractor';
import { RequestPoolRecordPage } from './pool-records.po';

describe('All Request Pool', () => {
  const allRequest = new RequestPoolRecordPage();

  beforeAll(() => {
    allRequest.navigateToAllRequestsPage();
    browser.sleep(3000);
  });

  it('Should be on the all requests pool page', () => {
    expect(browser.driver.getCurrentUrl()).toContain('/all-requests');
    browser.sleep(2000);
  });

  it('Should open calendar tray', () => {
    browser.driver.findElement(by.id('calendar-picker')).click();
    browser.sleep(3000);
    expect(allRequest.getDivId()).toBeDefined();
  });
});
