import { browser, $, by } from 'protractor';
import { RequestPoolPage } from './pool.po';

describe('Request Pool', () => {
  const requestPool = new RequestPoolPage();

  beforeAll(() => {
    requestPool.navigateToPoolPage();
  });

  const expectedConditions = browser.ExpectedConditions;

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

  it('Should filter the request pool by location', () => {
    requestPool.getLocationFilter().click();
    requestPool.getLagosFilter().click();
    browser.sleep(3000);
  })

  it('Should remove requests shown interest in from the requests pool', () => {
    let firstRequestText;
    browser.sleep(2000);
    requestPool.getFirstRequestTitle().getText()
    .then((text) => {
      firstRequestText = text;
      requestPool.getRequestsInRequestPool().get(0).click();
    });
    browser.sleep(2000)
    requestPool.getIAmInterestedButton().click();
    browser.sleep(2000);
    browser.driver.findElement(by.id('close-button')).click();
    browser.sleep(1000);
    browser.driver.findElement(by.id('back-modal-button')).click();
    browser.sleep(3000);
    expect(requestPool.getFirstRequestTitle())
      .not.toContain(firstRequestText);
  });

  it('Should be able to view request details after requesting for mentor', () => {
    browser.actions().mouseMove(requestPool.getRequestForButton()).perform();
    requestPool.requestAMentor();

    browser.wait(expectedConditions.elementToBeClickable($('.blue-button')), 3000);
    requestPool.getViewAlertButton().click();

    browser.wait(expectedConditions.elementToBeClickable($('.request-modal')), 3000);
    expect(requestPool.getSingleRequestModal().isDisplayed).toBeTruthy();

    browser.wait(expectedConditions.elementToBeClickable($('#back-modal-button')), 3000);
    requestPool.getBackButton().click();
  });

  it('Should be able to request a mentor', () => {
    browser.actions().mouseMove(requestPool.getRequestForButton()).perform();
    requestPool.requestAMentor();
    browser.sleep(3000);

    requestPool.getCloseAlertButton().click();
    browser.sleep(3000);
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
