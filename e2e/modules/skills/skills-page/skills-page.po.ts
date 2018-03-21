import { browser, by, element, promise, ElementFinder } from 'protractor';

export class SkillsPage {

  /**
   * Navigates to skills page.
   *
   * @return {promise}
   */
  navigateToSkillsPage(): promise.Promise<any> {
    return browser.get('/admin/skills');
  }

  /**
   * Returns the add skill button element
   *
   * @returns {ElementFinder}
   * @memberof SkillsPage
   */
  getAddSkillButton(): ElementFinder {
    return element(by.id('add-skill-button'));
  }

  /**
   * Returns the save button element
   *
   * @returns {ElementFinder}
   * @memberof SkillsPage
   */
  getSaveButton(): ElementFinder {
    return element(by.id('save-button'));
  }

  /**
   * Return the skill name textbox
   *
   * @returns {ElementFinder}
   * @memberof SkillsPage
   */
  getSkillNameTextBox(): ElementFinder {
    return element(by.css('.skill-name'));
  }

}
