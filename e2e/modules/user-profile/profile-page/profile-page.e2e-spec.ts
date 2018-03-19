import { browser, $ } from 'protractor';
import { ProfilePage } from './profile-page.po';

describe('Profile Page', () => {
  const profilePage = new ProfilePage();

  const EC = browser.ExpectedConditions;

  it('Should show the user profile when a user clicks on \'view profile\'', () => {
    browser.actions().mouseMove(profilePage.getuserIcon()).perform();

    browser.wait(EC.elementToBeClickable(profilePage.viewProfileButton()), 3000);
    profilePage.viewProfileButton().click();

    expect(profilePage.userSkillsElement()).toBeTruthy();
  });

  it('Should add skill', () => {
    profilePage.addSkills();
  });

  it('Should ensure that the first primary-skill on \'request-pool\' is \'Grunt & Gulp\'', () => {
    profilePage.navigateToPoolPage();
    browser.wait(EC.visibilityOf(profilePage.getTable()), 3000);

    expect(profilePage.getFirstPrimarySkill().getText()).toEqual('Grunt & Gulp');
    browser.sleep(2000)
  })

  it('Should navigate to profile page and remove skill', () => {
    profilePage.navigateToProfilePage();
    browser.sleep(3000);
    browser.refresh();

    profilePage.removeSkills();
  })
});
