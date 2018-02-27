import { browser, element, by } from 'protractor';
import { RequestPoolRecordPage } from './pool-records.po';
import { LoginPage } from '../../shared/login/login.po';
import { Browser } from 'selenium-webdriver';

describe('Request Pool', () => {
  const login = new LoginPage();
  const allRequest = new RequestPoolRecordPage();

  login.navigateToLogin();
  login.logInUsingGoogleAuth();

  it('Should be on the all request pool page', () => {
    browser.actions().mouseMove(allRequest.getDashboardButton()).perform();
    allRequest.ViewAllRequestPage();
    browser.sleep(2000);
    expect(browser.driver.getCurrentUrl()).toContain('/all-requests');
    browser.sleep(2000);
  });

  it('Should open calendar tray', () => {
    browser.driver.findElement(by.id('calendar-picker')).click();
    browser.sleep(3000);
    expect(allRequest.getDivId()).toBeDefined();
  });
});
