import { browser, by, element, promise, ElementFinder, ElementArrayFinder, $, protractor } from 'protractor';

export class ProfilePage {

  /**
   * Navigates to the request pool page
   *
   * @return {promise.Promise<any>}
   */
  navigateToPoolPage(): promise.Promise<any> {
    return element(by.id('pool')).click();
  }

  /**
   * Navigates to the profile page
   *
   * @return {promise.Promise<any>}
   */
  navigateToProfilePage(): promise.Promise<any> {
    return browser.get('/profile');
  }

  /**
   * Gets the user icon on the header
   *
   * @return {WebElement}
   */
  getuserIcon(): ElementFinder {
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

  /**
   * Add skills
   *
   * @return {void}
   */
  addSkills() {
    const inputSkill = element(by.id('input-skill'))
    browser.sleep(2000);

    inputSkill.sendKeys('Grunt & Gulp');
    browser.sleep(2000);

    inputSkill.sendKeys(protractor.Key.ENTER);

    const addSkill = element(by.css('.add'));
    addSkill.click();
    browser.sleep(2000);
  }

  /**
   * Remove skills
   *
   * @return {void}
   */
  removeSkills() {
    const removeSkill = element(by.id('Grunt & Gulp'))
    removeSkill.click();
  }
}
