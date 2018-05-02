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
   * Get the open requests filter
   *
   * @return {WebElement}
   */
  getOpenRequestsFilter() {
    return this.getRequestFilters().get(2);
  }

  /**
   * Get the open requests filter span
   *
   * @return {WebElement}
   */
  getOpenRequestsFilterSpan() {
    return this.getOpenRequestsFilter().$('span');
  }
  /**
   * should get date filters
   *
   * @return {WebElement}
   */
  getDateFilters(): ElementArrayFinder {
    return element.all(by.className('week-date'));
  }

  /**
   * get week-date
   *
   * @return {WebElement}
   */
  getStartCalenderFilterDatePickers(): ElementFinder {
    return element.all(by.id('calendar-picker')).first();
  }

  /**
   * get status filter
   *
   * @return {WebElement}
   */
  getStatusFilter(): ElementFinder {
    return this.getOpenRequestsFilter().$('.content').$('.statistics');
  }

  /**
   * get all thet date filters wrapped in a promise
   *
   * @return
   */
  getEndDateCalenderFilterDatePickers(): ElementFinder {
    return element.all(by.id('calendar-picker')).last();
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
    return element.all(by.className('card'));
  }

}
