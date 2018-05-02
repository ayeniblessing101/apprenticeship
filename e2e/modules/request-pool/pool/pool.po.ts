import { browser, by, element, promise, ElementFinder, ElementArrayFinder, $, $$, protractor } from 'protractor';
import requests from '../../../../src/app/mocks/requests';

const expectedConditions = browser.ExpectedConditions;
export class RequestPoolPage {

  /**
   * Navigates to the request pool page
   *
   * @return {promise.Promise<any>}
   */
  navigateToPoolPage(): promise.Promise<any> {
    return element(by.id('pool')).click();
  }

  /**
   * Gets the location filter in the request pool
   *
   * @return {WebElement}
   */
  getLocationFilter(): ElementFinder {
    return element(by.id('location'));
  }

  /**
   * Gets the searchbar element in the pool
   *
   * @return {Void}
   */
  getSearchInputElement() {
    const inputSearch = element(by.id('search'));
    inputSearch.sendKeys('quae');
  }
  /**
   * Gets the lagos filter button in the request pool
   *
   * @return {WebElement}
   */
  getLagosFilter(): ElementFinder {
    return this.getLocationFilter().all(by.css('.drop-show label')).get(2);
  }

  /**
   * Gets the length filter in the request pool
   *
   * @return {WebElement}
   */
  getLengthFilter(): ElementFinder {
    return element(by.id('length-filter'));
  }

  /**
   * Gets the one month filter checkbox in the request pool
   *
   * @return {WebElement}
   */
  getMonthsFilter(): ElementFinder {
    return this.getLengthFilter().all(by.css('.drop-show label')).get(2);
  }

  /**
   * Gets the skills filter in the request pool
   *
   * @return {WebElement}
   */
  getSkillsFilter(): ElementFinder {
    return element(by.id('skill-set'));
  }

  /**
   * Gets the skills filter in the request pool
   *
   * @return {WebElement}
   */
  getSkillsFilterCheckbox(): ElementFinder {
    return this.getSkillsFilter().all(by.css('.drop-show label')).get(2);
  }

  /**
   * Gets the requests in the request pool
   *
   * @return {WebElement}
   */
  getRequestsInRequestPool(): ElementFinder {
    return element(by.className('pool-body'));
  }
  /**
   * Gets the requests in the request pool
   *
   * @return {Array}
   */
  getRequestRowsInRequestPool(): ElementArrayFinder {
    return this.getRequestsInRequestPool().all(by.className('custom-row'));
  }

  /**
   * Gets the single request modal
   *
   * @return {WebElement}
   */
  getSingleRequestModal(): ElementFinder {
    return element(by.className('request-modal'));
  }

  /**
   * Gets the back button on the request modal
   *
   * @return {WebElement}
   */
  getRequestModalBackButton(): ElementFinder {
    return element(by.id('back-modal-button'));
  }

  /** Gets the i'm interested button
   * on the request modal
   *
   * @return {WebElement}
   */
  getIAmInterestedButton(): ElementFinder {
    return element(by.id('btn-interested'));
  }

  /** Gets the notification close button
   * on the request modal
   *
   * @return {WebElement}
   */
  getNotificationCloseButton(): ElementFinder {
    return element(by.id('close-button'));
  }

  /**
   * Gets the Request For button on the
   * header
   *
   * @return {WebElement}
   */
  getRequestForButton(): ElementFinder {
    return element(by.id('request-button'));
  }

  /**
   * Gets the all requests radio button
   *
   * @return {WebElement}
   */
  getAllRequestsRadioButton(): ElementFinder {
    return element(by.id('all-requests-label'));
  }

  /**
   * Gets the row element of the first request
   *
   * @param {string} id - The id of the element
   *
   * @return {WebElement}
   */
  getFirstRowMentorshipRequest(): ElementFinder {
    return this.getRequestsInRequestPool().all(by.className('custom-row')).get(0);
  }

  /* Gets the mentor button after hovering
  * over the Request For button
  *
  * @return {WebElement}
  */
  getRequestMentorButton(): ElementFinder {
    return element(by.id('mentor'));
  }

  /* Gets the mentee button after hovering
  * over the Request For button
  *
  * @return {WebElement}
  */
  getRequestMenteeButton(): ElementFinder {
    return element(by.id('mentee'));
  }

  /* Gets the primary skills
  *
  * @return {WebElement}
  */
  getPrimarySkillsList(): ElementFinder {
    return element.all(by.tagName('app-skills-dropdown')).first();
  }

  /**
   * Fills the request mentor form.
   *
   * @return {void}
   */
  requestAMentor() {
    this.createRequest(requests[0]);
  }
  /**
   * Fills the request mentee form.
   *
   * @return {void}
   */
  requestAMentee() {
    this.createRequest(requests[2]);
  }

  /**
   * Creates request for the user
   *
   * @return {void}
   */
  createRequest(request) {
    const requestType = request.isMentor === true ? 'MENTOR' : 'MENTEE'
    browser.wait(expectedConditions.textToBePresentInElement($('.mentor-request-modal'), (requestType)), 3000);
    browser.wait(expectedConditions.visibilityOf(this.getPrimarySkillsList()), 3000);
    expect(this.getPrimarySkillsList().isPresent).toBeTruthy();
    this.getPrimarySkillsList().click()

    browser.wait(expectedConditions.elementToBeClickable($$('.request-content').first()), 5000);
    expect($$('.request-content').first()).toBeTruthy();
    $$('.request-content').first().click();

    const description = element(by.id('description'));
    description.sendKeys(request.description);

    const allDays = element(by.id('all-days-checkbox'));
    allDays.click();

    const requestMentorButton = element(by.id('btn-request'));
    requestMentorButton.click();

    browser.wait(expectedConditions.elementToBeClickable(this.getCloseAlertButton()), 5000);
    expect(this.getCloseAlertButton().isDisplayed).toBeTruthy();
    this.getCloseAlertButton().click();
  }

  /**
   * Gets request table headers in the history page
   *
   * @return {ElementFinder}
   */
  getPoolTableHeaders(id: number): ElementFinder {
    browser.wait(expectedConditions.elementToBeClickable($('.custom-col-2')),
                 5000, 'History table headers should have been rendered');
    return element.all(by.css('.custom-col-2')).get(id);
  }

  /**
   * Gets span request table headers in the history page
   *
   * @return {ElementFinder}
   */
  getPoolTableHeadersSpan(id): ElementFinder {
    return this.getPoolTableHeaders(id).$('span');
  }

  /**
   * Gets the view button when an
   * alert pops up
   *
   * @return {WebElement}
   */
  getViewAlertButton(): ElementFinder {
    return element(by.css('.blue-button'));
  }

  /**
   * Gets the view button when an
   * alert pops up
   *
   * @return {WebElement}
   */
  getBackButton(): ElementFinder {
    return element(by.id('back-modal-button'));
  }

  /**
   * Gets the close button when an
   * alert pops up
   *
   * @return {WebElement}
   */
  getCloseAlertButton(): ElementFinder {
    return element(by.css('.white-button'));
  }

  /**
   * Gets the notification icon on the
   * header
   *
   * @return {WebElement}
   */
  notificationIcon(): ElementFinder {
    return element(by.css('.notification'));
  }

  /**
   * Gets the notifications element
   *
   * @return {WebElement}
   */
  notificationElement(): ElementFinder {
    return element(by.css('.notification-icon'));
  }

  /**
   * Gets close notifications icon
   *
   * @return {WebElement}
   */
  closeNotificationsIcon(): ElementFinder {
    return element(by.id('notification-close-x'));
  }
}
