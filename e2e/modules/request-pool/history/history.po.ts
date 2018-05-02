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
      this.expectedCondition.elementToBeClickable($('.custom-col-2')),
      5000,
      'History table should have been rendered');

    return element.all(by.css('.custom-col-2'));
  }
  /**
   * Gets span tags in request table headers in the history page
   *
   * @return {ElementFinder}
   */
  getHistoryTableHeadersSpan(id: number): ElementFinder {
    return this.getHistoryTableHeaders().get(id).$('span')
  }
}
