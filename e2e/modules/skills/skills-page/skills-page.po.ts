import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

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

  /**
   * Return the skills pool table
   *
   * @memberof SkillsPage
   * @returns {ElementFinder}
   */
  getTable(): ElementFinder {
    return element(by.css('.pool-table'));
  }

  /**
   * Returns all divs in the pool body
   *
   * @returns {ElementArrayFinder}
   * @memberof SkillsPage
   */
  getAllSkillPool(): ElementArrayFinder {
    return this.getTable().all(by.css('.pool-body .body-content'));
  }

  /**
   * Gets a row attribute based on the index.
   *
   * @param {Number} index - zero-based index of the row to be gotten
   * @param {String} attribute - id selector of the row attribute
   *
   * @returns {ElementFinder} - the selected row attribute
   */
  getSkillRowAttribute(): ElementFinder {
    return this.getAllSkillPool().get(0).element(by.css('.custom-col-4'));
  }

  /**
   * Returns the DOM element with id close-button
   *
   * @returns {ElementFinder}
   */
  getAlertClose(): ElementFinder {
    return element(by.id('close-button'));
  }
}
