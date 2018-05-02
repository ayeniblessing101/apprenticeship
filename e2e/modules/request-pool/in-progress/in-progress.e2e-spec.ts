import { browser } from 'protractor';
import { InProgressPage } from './in-progress.po';

describe('In Progress', () => {
  const inProgress = new InProgressPage();
  beforeAll(() => {
    inProgress.navigateToInProgressPage();
    browser.waitForAngularEnabled(false);
  });

  it('Should contain Request column in table headers', () => {
    expect(inProgress.getRequestTextInTableHeader()).toBeTruthy();
    expect(inProgress.getRequestTextInTableHeader().getText()).toBe('Request');
  });

  it('Should sort requests by Duration in ascending and descending order', () => {
    expect(inProgress.getDurationTableHeader().getText()).toBe('Duration');
    inProgress.getDurationTableHeaderSpan().click();
    inProgress.getDurationTableHeaderSpan().click();
  });

  it('Should sort requests by Date started in ascending and descending order', () => {
    expect(inProgress.getDateStartedTableHeader().getText()).toBe('Date Started');
    inProgress.getTableHeaderSpan().click();
    inProgress.getTableHeaderSpan().click();
  });
});
