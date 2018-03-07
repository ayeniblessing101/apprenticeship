import { by, browser, element, ElementFinder, ElementArrayFinder, promise, $ } from 'protractor';

export class InProgress {

  /**
   * Navigates to the in-progress page
   *
   * @return {promise.Promise<any>}
   */
  navigateToInProgressPage(): promise.Promise<any> {
    return element(by.id('progress')).click();
  }

  /**
   * Gets request table headers in the in-progress page
   *
   * @return {ElementFinder}
   */
  getInProgressTableHeaders(): ElementArrayFinder {
    return element.all(by.css('.table .in-progress-header div'));
  }
}
