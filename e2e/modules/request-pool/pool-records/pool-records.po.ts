import { by, browser, element, ElementFinder, ElementArrayFinder, promise } from 'protractor';

export class PoolRecords {

  /**
   * Navigates to the request pool page
   *
   * @return {promise.Promise<any>}
   */
  navigateToPoolPage(): promise.Promise<any> {
    return element(by.id('pool')).click();
  }

  /**
   * Gets request headers in the requests pool page
   *
   * @return {ElementFinder}
   */
  getRequestsPoolTableHeaders(): ElementArrayFinder {
    return element.all(by.css('.table .pool-header div'));
  }
}
