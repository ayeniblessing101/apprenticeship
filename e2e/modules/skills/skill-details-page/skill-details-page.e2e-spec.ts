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

  it('Should show top mentors and skill details when click on a skill', () => {
    skillDetails.getAdminSkills().get(3).click();
    browser.wait(EC.visibilityOf(skillDetails.getSkillDetailsPage()),
                 3000, '.skill-wrapper should be visible');

    expect(skillDetails.getSkillDetailsPage()).toBeTruthy();
    browser.wait(EC.visibilityOf(skillDetails.getExportButton()),
                 3000, '.skill-wrapper should be visible');
  });

  it('Should export skill requests details when click on the export button', () => {
    skillDetails.getExportButton().click();
  });

  it('Should sort by mentor in acending and descending order', () => {
    browser.wait(EC.visibilityOf(skillDetails.getMentorSorter()), 3000, 'wait for visibility of mentor sorter');
    skillDetails.getMentorSorter().getText().then(
      (text) => {
        expect(text).toBe('Duration');
      },
    );
    skillDetails.getMentorSorter().click();
  });
});
