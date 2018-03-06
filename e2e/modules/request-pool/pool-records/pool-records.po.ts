import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class RequestPoolRecordPage {
  /**
   * Navigates to the admin all requests page
   *
   * @return {promise}
   */
  navigateToAllRequestsPage(): promise.Promise {
    return browser.get('/all-requests');
  }

  /**
   * Gets the table in the request pool
   *
   * @return {WebElement}
   */
  getCalenderPicker(): ElementFinder {
    return element(by.id('calender-picker'));
  }

  /**
  * Gets the Dashboard button on the
  * header
  *
  * @return {WebElement}
  */
  getDashboardButton(): ElementFinder {
    return element(by.id('admin-button'));
  }

  /**
   * Gets the All Requests button on the
   * header
   *
   * @return {WebElement}
   */
  getAllRequests(): ElementFinder {
    return element(by.id('requests-pool'));
  }

  /**
 * Gets the All requests page
 *
 */
  getAllRequestsPage() {
    this.getAllRequests().click();
  }
  /**
   * Gets the div with an id of base
   *
   * @return {WebElement}
   */
  getDivId(): ElementFinder {
    return element(by.id('base'));
  }
}
