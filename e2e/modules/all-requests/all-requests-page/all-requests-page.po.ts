import { browser, promise, ElementFinder, element, by, ElementArrayFinder, $, protractor, WebElement } from 'protractor';

export class AllRequestsPage {

/**
   * Navigates to the all request page
   *
   * @return {promise.Promise<any>}
   */
  navigateToAllRequestsPage(): promise.Promise<any> {
    return browser.get('/all-requests');
  }

  /**
   * get requests filters card container
   *
   * @return {WebElement}
   */
  getRequestsStatistics(): ElementFinder {
    return element(by.css('.card-container'));
  }

  /**
   * Gets the an array all the request filters
   *
   * @return {WebElement[]}
   */
  getRequestFilters(): ElementArrayFinder {
    return this.getRequestsStatistics().all(by.css('.card'));
  }

  /**
   * Get the all requests
   *
   * @return {WebElement}
   */
  getAllRequestsFilter() {
    return this.getRequestFilters().get(0);
  }

  /**
   * Get the open requests filter
   *
   * @return {WebElement}
   */
  getOpenRequestsFilter() {
    return this.getRequestFilters().get(1);
  }

  /**
   * get all thet date filters wrapped in a promise
   *
   * @return {Promise<WebElement[]>}
   */
  getCalenderFilterDatePickers(): promise.Promise<WebElement[]> {
    return browser.driver.findElements(by.id('calendar-picker'));
  }


  /**
   * get all available dates wrapped in a promise
   *
   * @return {Promise<WebElement[]>}
   */
  getDates(): promise.Promise<WebElement[]> {
    return browser.driver.findElements(by.css('.week-date'));
  }

  /**
   * Gets the dates in the request table
   *
   * @return {WebElement[]}
   */
  getDateCells(): ElementArrayFinder {
    return element.all(by.id('created-at'));
  }

  /**
   * Get the statistics elements inside of the card filders
   *
   * @return {WebElement[]}
   */
  getStatisticsElements(): ElementArrayFinder {
    return element.all(by.className('statistics'));
  }

}
