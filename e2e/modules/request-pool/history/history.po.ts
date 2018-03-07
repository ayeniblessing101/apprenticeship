import { by, browser, element, ElementFinder, ElementArrayFinder, promise, protractor, $ } from 'protractor';

export class History {

  expectedCondition = protractor.ExpectedConditions;

  /**
   * Navigates to the history page
   *
   * @return {promise.Promise<any>}
   */
  navigateToHistoryPage(): promise.Promise<any> {
    browser.wait(
      this.expectedCondition.visibilityOf($('#history')),
      3000,
      'history navigation link should be visible',
    );

    return element(by.id('history')).click();
  }

  /**
   * Gets request table headers in the history page
   *
   * @return {ElementFinder}
   */
  getHistoryTableHeaders(): ElementArrayFinder {
    browser.wait(
      this.expectedCondition.visibilityOf($('.table .history-header div')),
      3000,
      'History table should have been rendered');

    return element.all(by.css('.table .history-header div'));
  }
}
