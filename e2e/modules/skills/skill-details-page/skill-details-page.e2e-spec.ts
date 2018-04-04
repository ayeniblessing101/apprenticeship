import { browser, protractor } from 'protractor';
import { SkillDetails } from './skill-page.po';

const EC = protractor.ExpectedConditions;

describe('Skill page', () => {
  const skillDetails = new SkillDetails();

  beforeAll(() => {
    skillDetails.navigateToSkillPage();
    browser.wait(EC.visibilityOf(skillDetails.getTable()),
                 3000, '.pool-table should be visible');
  });

  it('Should show skill details when click on a skill', () => {
    skillDetails.getAdminSkills().get(0).click();
    browser.wait(EC.visibilityOf(skillDetails.getSkillDetailsPage()),
                 3000, '.skill-wrapper should be visible');

    expect(skillDetails.getSkillDetailsPage()).toBeTruthy();
    browser.wait(EC.visibilityOf(skillDetails.getExportButton()),
                 3000, '.skill-wrapper should be visible');
  });

  it('Should export skill requests details when click on the export button', () => {
    skillDetails.getExportButton().click();
  });
});
