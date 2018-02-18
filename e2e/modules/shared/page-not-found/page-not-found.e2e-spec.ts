import { browser } from 'protractor';
import { LoginPage } from '../../shared/login/login.po';
import { PageNotFound } from './page-not-found.po';

describe('Page Not Found', () => {
  const pageNotFound = new PageNotFound();

  it('Should show page not found when user navigates to an invalid url', () => {
    pageNotFound.navigateToInvalidPage();

    expect(pageNotFound.getPageNotFound()).toBeTruthy();
    browser.sleep(3000)
  });

});
