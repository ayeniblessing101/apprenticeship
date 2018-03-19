import { browser, by, $ } from 'protractor';
import { RequestPoolPage } from './pool.po';

describe('Request Pool', () => {
  const requestPool = new RequestPoolPage();

  beforeAll(() => {
    requestPool.navigateToPoolPage();
  });

  const EC = browser.ExpectedConditions;

  it('Should be on the request pool page', () => {
    expect(browser.driver.getCurrentUrl()).toContain('/request-pool');
  });

  it('Should show a request modal when a request is clicked', () => {
    requestPool.getRequestsInRequestPool().get(0).click();
    browser.sleep(2000);
    expect(requestPool.getSingleRequestModal().isDisplayed).toBeTruthy();
    requestPool.getRequestModalBackButton().click();
    browser.sleep(3000);
  });

  it('Should be able to request a mentor', () => {
    browser.actions().mouseMove(requestPool.getRequestForButton()).perform();
    requestPool.requestAMentor();
    browser.wait(EC.visibilityOf(requestPool.getCloseAlertButton()),
                 3000, '.white-button should be visible');

    requestPool.getCloseAlertButton().click();
    browser.wait(EC.visibilityOf(requestPool.getAllRequestsRadioButton()),
                 3000, 'all-requests-label should be visible');
    requestPool.getAllRequestsRadioButton().click();
    expect(requestPool.getFirstRequestTitle().getText()).toContain('Angular e2e');
    browser.sleep(2000);
  });

  it('Should filter the request pool by location', () => {
    requestPool.getLocationFilter().click();
    requestPool.getLagosFilter().click();
    browser.sleep(3000);
  });

  it('Should filter the request pool by duration', () => {
    requestPool.getAllRequestsRadioButton().click();
    browser.wait(EC.visibilityOf(requestPool.getLengthFilter()),
                 5000, 'length element should be visible');
    requestPool.getLengthFilter().click();
    browser.wait(EC.elementToBeClickable(requestPool.getMonthsFilter()),
                 5000, 'months element should be clickable');
    requestPool.getMonthsFilter().click();
    expect(requestPool.getFirstRowMentorshipRequestDuration().getText()).toContain('2 Months')
    browser.sleep(2000);
  });

  it('Should filter the request pool by skill', () => {
    requestPool.getAllRequestsRadioButton().click();
    browser.wait(EC.visibilityOf(requestPool.getSkillsFilter()),
                 5000, 'skill-set element should be clickable');
    requestPool.getSkillsFilter().click();
    browser.wait(EC.elementToBeClickable(requestPool.getSkillsFilterCheckbox()),
                 5000, 'skills element should be clickable');
    requestPool.getSkillsFilterCheckbox().click();
    browser.sleep(2000);
    browser.waitForAngularEnabled(false);
  });

  it('Should remove requests shown interest in from the requests pool', () => {
    let newFirstRequestText;
    browser.wait(requestPool.getFirstRequestTitle().isDisplayed, 3000);
    requestPool.getFirstRequestTitle().getText()
    .then((text) => {
      newFirstRequestText = text;
      requestPool.getRequestsInRequestPool().get(0).click();
      browser.wait(EC.visibilityOf(requestPool.getIAmInterestedButton()),
                   3000, 'this time i\'m interested button should be visible')
      requestPool.getIAmInterestedButton().click();
      browser.wait(EC.visibilityOf(requestPool.getNotificationCloseButton()),
                   3000, 'this time notification close button should be visible');
      requestPool.getNotificationCloseButton();
      browser.driver.findElement(by.id('close-button')).click();
      browser.sleep(1000);
      browser.driver.findElement(by.id('back-modal-button')).click();
      browser.sleep(3000);
      expect(requestPool.getFirstRequestTitle())
        .not.toContain(newFirstRequestText);
    });
  });

  it('Should be able to view request details after requesting for mentor', () => {
    browser.actions().mouseMove(requestPool.getRequestForButton()).perform();
    requestPool.requestAMentor();

    browser.wait(EC.elementToBeClickable(requestPool.getViewAlertButton()), 3000);
    requestPool.getViewAlertButton().click();

    browser.wait(EC.elementToBeClickable(requestPool.getSingleRequestModal()), 3000);
    expect(requestPool.getSingleRequestModal().isDisplayed).toBeTruthy();

    browser.wait(EC.elementToBeClickable(requestPool.getBackButton()), 3000);
    requestPool.getBackButton().click();
  });

  it('Should show notifications when user clicks on notifications icon', () => {
    requestPool.notificationIcon().click();
    browser.sleep(3000);

    expect(requestPool.notificationElement()).toBeTruthy();

    requestPool.closeNotificationsIcon().click();
    browser.sleep(1500);
  });

  it('Should show the user profile when a user clicks on \'view profile\'', () => {
    browser.actions().mouseMove(requestPool.userIcon()).perform();

    requestPool.viewProfileButton().click();
    browser.sleep(2000);

    expect(requestPool.userSkillsElement()).toBeTruthy();
    browser.waitForAngularEnabled(false);
  });
});
