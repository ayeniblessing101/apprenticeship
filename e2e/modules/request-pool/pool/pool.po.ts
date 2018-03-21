import { browser, by, element, promise, ElementFinder, ElementArrayFinder, $, protractor } from 'protractor';

const expectedConditions = browser.ExpectedConditions;
export class RequestPoolPage {

  expectedConditions = protractor.ExpectedConditions;
  /**
   * Navigates to the request pool page
   *
   * @return {promise.Promise<any>}
   */
  navigateToPoolPage(): promise.Promise<any> {
    return element(by.id('pool')).click();
  }

  /**
   * Gets the table in the request pool
   *
   * @return {WebElement}
   */
  getTable(): ElementFinder {
    return element(by.css('.table'));
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
   * @return {Array}
   */
  getRequestsInRequestPool(): ElementArrayFinder {
    return this.getTable().all(by.css('#request-pool div'));
  }

  /**
   * Gets the single request modal
   *
   * @return {WebElement}
   */
  getSingleRequestModal(): ElementFinder {
    return element(by.tagName('app-request-details'));
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
  getFirstRowMentorshipRequest(id): ElementFinder {
    return this.getRequestsInRequestPool().get(0).element(by.id(id))
  }

  /* Gets the mentor button after hovering
  * over the Request For button
  *
  * @return {WebElement}
  */
  getRequestMentorButton(): ElementFinder {
    return element(by.id('mentor'));
  }

  /**
   * Fills the request mentor form.
   *
   * @return {void}
   */
  requestAMentor(request) {

    this.getRequestMentorButton().click();
    browser.wait(expectedConditions.elementToBeClickable($('.mentor-request-modal')), 3000);

    const neededSkill = element(by.id('needed-skill'));
    neededSkill.sendKeys(request.title);

    const description = element(by.id('description'));
    description.sendKeys(request.description);

    const basicSkills = element(by.id('basic-skills'));
    basicSkills.click();

    const basicSkillsDropDown = element.all(by.css('.request-content a'));
    const angular = basicSkillsDropDown.get(8);
    angular.click();

    const allDays = element(by.id('all-days-checkbox'));
    allDays.click();

    const requestMentorButton = element(by.id('btn-request'));
    requestMentorButton.click();
    browser.sleep(2000);
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
    return element(by.tagName('app-notifications'));
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
