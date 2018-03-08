import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class PendingPoolRecordPage {
  /**
   * Navigates user to the pending page
   *
   * @return {promise}
   */
  navigateToPendingPoolPage(): promise.Promise<any> {
    return browser.get('/request-pool/pending');
  }
  /**
   * Gets the table in the request pool
   *
   * @return {WebElement}
   */
  getTable(): ElementFinder {
    return element(by.className('pool-table'));
  }
}
