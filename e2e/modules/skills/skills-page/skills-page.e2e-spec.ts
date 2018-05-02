import { browser, protractor } from 'protractor';
import { SkillsPage } from './skills-page.po';

const EC = protractor.ExpectedConditions;
const faker = require('faker');

describe('Admin skills', () => {

  const skillsPage = new SkillsPage();

  beforeAll(() => {
    skillsPage.navigateToSkillsPage();
    browser.waitForAngularEnabled(false);
  });

  it('should be on the All Skill page', () => {
    expect(browser.driver.getCurrentUrl()).toContain('admin/skills');
  });

  it('should be able to add a skill', () => {
    let fakeSkillName;
    fakeSkillName = faker.name.jobArea();

    browser.wait(EC.visibilityOf(skillsPage.getAddSkillButton()),
                 5000, '.skill-name should be visible');
    skillsPage.getAddSkillButton().click();

    browser.wait(EC.visibilityOf(skillsPage.getSkillNameTextBox()),
                 5000, '.skill-name should be visible');

    skillsPage.getSkillNameTextBox().sendKeys(fakeSkillName);
    browser.wait(EC.elementToBeClickable(skillsPage.getSaveButton()),
                 5000, '#save-button should be clickable');

    skillsPage.getSaveButton().click();
    browser.wait(EC.elementToBeClickable(skillsPage.getAlertClose()),
                 5000, '#close-button should be clickable');

    skillsPage.getAlertClose().click();
    browser.wait(EC.visibilityOf(skillsPage.getTable()),
                 5000, '.pool-table should be visible');

    expect(skillsPage.getSkillRowAttribute().getText()).toContain(fakeSkillName);
  });
});
