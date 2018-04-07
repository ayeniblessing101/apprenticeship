import { browser, promise, ElementFinder, element, by } from 'protractor';

export class SkillMentors {

  /**
   * Navigate to the skill mentors page
   *
   * @return {Promise<any>}
   */
  navigateToSkillMentorsPage(): promise.Promise<any> {
    return browser.get('/admin/skills/18/mentors');
  }

  /**
   * Navigate to a non existant skill
   *
   * @return {Promise<any>}
   */
  navigateToNoneExistantSkillMentorsPage(): promise.Promise<any> {
    return browser.get('/admin/skills/1001010210/mentors');
  }

  /**
   * Gets mentor sorter from the table header in the skill mentors page
   *
   * @return {ElementFinder}
   */
  getMentorSorter(): ElementFinder {
    return element.all(by.className('custom-col-4')).get(0);
  }
}
