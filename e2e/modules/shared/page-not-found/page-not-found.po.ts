import { browser, by, element, promise, ElementFinder } from 'protractor';

export class PageNotFound {
  navigateToInvalidPage(): promise.Promise<any> {
    return browser.get('/request-pool/notexist');
  }

  /**
   * Gets page not found
   *
   * @return {WebElement}
   */
  getPageNotFound(): ElementFinder {
    return element(by.id('page-not-found'));
  }
}
