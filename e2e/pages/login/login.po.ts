import { browser, by, element } from 'protractor';

export class LoginComponentPage {
  navigateTo() {
    return browser.get('/login');
  }

  getLoginButtonText() {
    return element(by.className('login-text')).getText();
  }
}
