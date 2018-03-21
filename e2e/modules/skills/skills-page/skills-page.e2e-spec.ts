import { browser, protractor } from 'protractor';
import { SkillsPage } from './skills-page.po';

const EC = protractor.ExpectedConditions;
const faker = require('faker');

describe('Admin skills', () => {

  const skillsPage = new SkillsPage();

  beforeAll(() => {
    skillsPage.navigateToSkillsPage();
  });

  it('should be on the All Skill page', () => {
    expect(browser.driver.getCurrentUrl()).toContain('admin/skills');
    browser.sleep(2000);
  });

  it('should be able to add a skill', () => {
    browser.waitForAngularEnabled(false)
    skillsPage.getAddSkillButton().click();
    browser.wait(EC.visibilityOf(skillsPage.getSkillNameTextBox()),
                 3000, '.skill-name should be visible');
    skillsPage.getSkillNameTextBox().sendKeys(faker.name.jobArea());

    browser.wait(EC.elementToBeClickable(skillsPage.getSaveButton()),
                 3000, '#save-button should be clickable');
    skillsPage.getSaveButton().click();
    browser.sleep(2000);
  });
});
