import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class SkillRecords {

  /**
   * Navigates to skills page.
   *
   * @return {Array}
   */
  navigateToSkillsPage(): promise.Promise<any> {
    return browser.get('/admin/skills');
  }
}
