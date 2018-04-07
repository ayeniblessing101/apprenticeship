import { browser, protractor } from 'protractor';
import { SkillMentors } from './skill-mentors.po';

describe('Skill mentors page', () => {
  const skillMentors = new SkillMentors();
  const EC = protractor.ExpectedConditions;

  beforeAll(() => {
    skillMentors.navigateToSkillMentorsPage();
  });

  it('Should be on the admin skill mentors page', () => {
    expect(browser.driver.getCurrentUrl()).toContain('/admin/skills/18/mentors');
  });

  it('Should sort by mentor in acending and descending order', () => {
    browser.wait(EC.visibilityOf(skillMentors.getMentorSorter()), 3000, 'wait for visibility of mentor sorter');
    skillMentors.getMentorSorter().getText().then(
      (text) => {
        expect(text).toBe('Mentor');
      },
    );
    skillMentors.getMentorSorter().click();
  });
})
