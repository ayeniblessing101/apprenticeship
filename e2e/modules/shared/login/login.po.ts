import { browser, by, element, promise, ElementFinder } from 'protractor';

export class LoginPage {
  navigateToLogin(): promise.Promise<any> {
    return browser.get('/login');
  }

  /**
   * Gets the name of the application
   *
   * @return {Promise}
   */
  getApplicationName(): promise.Promise<string> {
    return (element(by.css('.text')).getText());
  }

  /**
   * Gets the application tagline
   *
   * @return {Promise}
   */
  getApplicationTagline(): promise.Promise<string> {
    return (element(by.css('.tagline')).getText());
  }

  /**
   * Gets the sign in button
   *
   * @return {WebElement}
   */
  getSignInButton(): ElementFinder {
    return (element(by.tagName('a')));
  }

  /**
   * Logs into the application using
   * google auth
   *
   * @return {void}
   */
  logInUsingGoogleAuth() {
    this.getSignInButton().click();
    browser.sleep(3000);
    const emailInput = browser.driver.findElement(by.id('identifierId'));
    emailInput.sendKeys('test-user-admin@andela.com');

    const nextButton = browser.driver.findElement(by.id('identifierNext'));
    nextButton.click();
    browser.sleep(3000);

    const passwordInput = browser.driver.findElement(by.css('input[type=password]'));
    passwordInput.sendKeys('andela2015');

    const passwordNextButton = browser.driver.findElement(by.id('passwordNext'));
    passwordNextButton.click();
    browser.sleep(5000);
  }

}
