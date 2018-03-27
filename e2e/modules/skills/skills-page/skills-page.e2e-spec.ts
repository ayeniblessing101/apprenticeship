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
    let fakeSkillName;
    fakeSkillName = faker.name.jobArea();

    browser.waitForAngularEnabled(false)
    skillsPage.getAddSkillButton().click();
    browser.wait(EC.visibilityOf(skillsPage.getSkillNameTextBox()),
                 3000, '.skill-name should be visible');

    skillsPage.getSkillNameTextBox().sendKeys(fakeSkillName);
    browser.wait(EC.elementToBeClickable(skillsPage.getSaveButton()),
                 3000, '#save-button should be clickable');

    skillsPage.getSaveButton().click();
    browser.wait(EC.elementToBeClickable(skillsPage.getAlertClose()),
                 3000, '#close-button should be clickable');

    skillsPage.getAlertClose().click();
    browser.wait(EC.visibilityOf(skillsPage.getTable()),
                 3000, '.pool-table should be visible');

    expect(skillsPage.getSkillRowAttribute(0, 'skill-name').getText()).toContain(fakeSkillName);
    browser.sleep(2000);
  });
});
