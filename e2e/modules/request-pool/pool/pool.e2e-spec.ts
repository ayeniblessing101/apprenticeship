import { browser } from 'protractor';
import { RequestPoolPage } from './pool.po';

describe('Request Pool', () => {
  const requestPool = new RequestPoolPage();

  beforeAll(() => {
    requestPool.navigateToPoolPage();
  });

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
  });
});
