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

  it('Should navigate to profile page and remove skill', () => {
    browser.sleep(5000);
    profilePage.removeSkills();
  })
});
