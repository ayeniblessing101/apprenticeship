import { browser } from 'protractor';
import { InProgress } from './in-progress.po';

describe('In Progress', () => {
  const inProgress = new InProgress();
  beforeAll(() => {
    inProgress.navigateToInProgressPage();
  });

  it('Should have in-progress table headers', () => {
    expect(inProgress.getInProgressTableHeaders()).toBeTruthy();
  });

  it('Should sort requests by Title in ascending and descending order', () => {
    expect(inProgress.getInProgressTableHeaders().get(0).getText()).toBe('Request');
    inProgress.getInProgressTableHeaders().get(0).$('span').click();
    browser.sleep(1000);
    inProgress.getInProgressTableHeaders().get(0).$('span').click();
    browser.sleep(1000);
  });

  it('Should sort requests by Duration in ascending and descending order', () => {
    expect(inProgress.getInProgressTableHeaders().get(2).getText()).toBe('Duration');
    inProgress.getInProgressTableHeaders().get(2).$('span').click();
    browser.sleep(1000);
    inProgress.getInProgressTableHeaders().get(2).$('span').click();
    browser.sleep(1000);
  });

  it('Should sort requests by Date started in ascending and descending order', () => {
    expect(inProgress.getInProgressTableHeaders().get(3).getText()).toBe('Date Started');
    inProgress.getInProgressTableHeaders().get(3).$('span').click();
    browser.sleep(1000);
    inProgress.getInProgressTableHeaders().get(3).$('span').click();
    browser.sleep(1000);
  });

  it('Should sort requests by Location in ascending and descending order', () => {
    expect(inProgress.getInProgressTableHeaders().get(4).getText()).toBe('Location');
    inProgress.getInProgressTableHeaders().get(4).$('span').click();
    browser.sleep(1000);
    inProgress.getInProgressTableHeaders().get(4).$('span').click();
    browser.sleep(1000);
  });

  it('Should sort requests by Role in ascending and descending order', () => {
    expect(inProgress.getInProgressTableHeaders().get(5).getText()).toBe('Role');
    inProgress.getInProgressTableHeaders().get(5).$('span').click();
    browser.sleep(1000);
    inProgress.getInProgressTableHeaders().get(5).$('span').click();
    browser.sleep(1000);
  });
});
