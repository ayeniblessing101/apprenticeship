import { browser } from 'protractor';
import { PageNotFound } from './page-not-found.po';

describe('Page Not Found', () => {
  const pageNotFound = new PageNotFound();

  beforeAll(() => {
    pageNotFound.navigateToInvalidPage();
    browser.sleep(3000);
  });

  it('Should show page not found when user navigates to an invalid url', () => {
    expect(pageNotFound.getPageNotFound()).toBeTruthy();
    browser.waitForAngularEnabled(false);
  });
});
