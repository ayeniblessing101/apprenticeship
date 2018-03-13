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

  /**
   * Gets the request title of the first request
   * on the request pool
   *
   * @return {WebElement}
   */
  getFirstRequestTitle(): ElementFinder {
    return this.getRequestsInRequestPool().get(0).element(by.id('title'));
  }

  /** Gets the i'm interested button
   * on the request modal
   *
   * @return {WebElement}
   */
  getIAmInterestedButton(): ElementFinder {
    return element(by.id('btn-interested'));
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
   * Gets the first row element with id 'request-location'
   *
   * @return {WebElement}
   */
  getFirstRowMentorshipRequestLocation(): ElementFinder {
    return this.getRequestsInRequestPool().get(0).element(by.id('request-location'));
  }

  /**
   * Gets the first row element with id 'duration'
   *
   * @return {WebElement}
   */
  getFirstRowMentorshipRequestDuration(): ElementFinder {
    return this.getRequestsInRequestPool().get(0).element(by.id('duration'));
  }

  /**
   * Gets the first row element with id 'primary-skill'
   *
   * @return {WebElement}
   */
  getFirstRowMentorshipRequestSkill(): ElementFinder {
    return this.getRequestsInRequestPool().get(0).element(by.id('primary-skill'));
  }

  /**
   * Gets the mentor button after hovering
   * over the Request For button
   *
   * @return {WebElement}
   */
  getRequestMentorButton(): ElementFinder {
    return element(by.id('mentor'));
  }

  /**
   * Fills the request a mentor form
   *
   * @return {void}
   */
  requestAMentor() {
    this.getRequestMentorButton().click();
    browser.wait(expectedConditions.elementToBeClickable($('.mentor-request-modal')), 3000);

    const neededSkill = element(by.id('needed-skill'));
    neededSkill.sendKeys('Angular e2e');

    const description = element(by.id('description'));
    description.sendKeys('I\'d like to write angular e2e tests like a pro');

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

  /**
   * Gets the user icon on the header
   *
   * @return {WebElement}
   */
  userIcon(): ElementFinder {
    return element(by.css('.user-icon'));
  }

  /**
   * Gets the view profile icon after
   * hovering over the user icon
   *
   * @return {WebElement}
   */
  viewProfileButton(): ElementFinder {
    return element(by.id('view-profile'));
  }

  /**
   * Gets the user skills element
   *
   * @return {WebElement}
   */
  userSkillsElement(): ElementFinder {
    return element(by.tagName('app-user-skills'));
  }
}
