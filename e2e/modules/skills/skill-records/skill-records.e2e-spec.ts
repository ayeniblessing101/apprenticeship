import { browser } from 'protractor';
import { SkillRecords } from './skill-records.po';
import { LoginPage } from '../../shared/login/login.po';

describe('Admin skills', () => {
  const skills = new SkillRecords();
  beforeAll(() => {
    skills.navigateToSkillsPage();
  });
  it('Should be on the admin page', () => {
    expect(browser.driver.getCurrentUrl()).toContain('admin/skills');
  });

});
