import { by, browser, element, ElementFinder, ElementArrayFinder, promise, $ } from 'protractor';

export class InProgressPage {

  /**
   * Navigates to the in-progress page
   *
   * @return {promise.Promise<any>}
   */
  navigateToInProgressPage(): promise.Promise<any> {
    return element(by.id('progress')).click();
  }

  /**
   * Gets Request column in requests table headers in the in-progress page
   *
   * @return {ElementFinder}
   */
  getRequestTextInTableHeader(): ElementFinder {
    return element.all(by.css('.custom-col-3')).get(0);
  }

  /**
   * Gets Duration column in duration table headers in the in-progress page
   *
   * @return {ElementFinder}
   */
  getDurationTableHeader(): ElementFinder {
    return element.all(by.css('.custom-col-2')).get(0);
  }

  /**
   * Gets the span field in the duration table column
   *
   * @return {ElementFinder}
   */
  getDurationTableHeaderSpan(): ElementFinder {
    return this.getDurationTableHeader().$('span');
  }

  /**
   * Gets Date Started column in duration table headers in the in-progress page
   *
   * @return {ElementFinder}
   */
  getDateStartedTableHeader(): ElementFinder {
    return element.all(by.css('.custom-col-3')).get(1);
  }
  /**
   * Gets Date Started column in duration table headers in the in-progress page
   *
   * @return {ElementFinder}
   */
  getTableHeaderSpan(): ElementFinder {
    return this.getDateStartedTableHeader().$('span');
  }
}
