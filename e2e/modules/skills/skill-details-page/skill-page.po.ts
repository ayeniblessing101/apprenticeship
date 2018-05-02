import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class SkillDetails {
  navigateToSkillPage(): promise.Promise<any> {
    return browser.get('admin/skills');
  }

  /**
   * Gets skill details page
   *
   * @return {WebElement}
   */
  getSkillDetailsPage(): ElementFinder {
    return element(by.css('.skill-wrapper'));
  }

  /**
   * Gets the table in the admin skill
   *
   * @return {WebElement}
   */
  getTable(): ElementFinder {
    return element(by.css('.pool-table'));
  }

  /**
   * Gets the export button in the admin skill details poage
   *
   * @return {WebElement}
   */
  getExportButton(): ElementFinder {
    return element(by.css('.export-button'));
  }

  /**
   * Gets admin skills
   *
   * @return {Array}
   */
  getAdminSkills(): ElementArrayFinder {
    return this.getTable().all(by.css('#skill-pool'));
  }

  /**
   * Gets mentor sorter from the table header in the skill mentors page
   *
   * @return {ElementFinder}
   */
  getMentorSorter(): ElementFinder {
    return element.all(by.className('custom-col-2')).get(2);
  }
}
