import { browser, protractor, by } from 'protractor';
import { History } from './history.po';

describe('History', () => {
  const history = new History();
  beforeAll(() => {
    history.navigateToHistoryPage();
    browser.waitForAngularEnabled(false);
  });

  it('Should have history table headers', () => {
    expect(history.getHistoryTableHeaders()).toBeTruthy();
  });

  it('Should sort requests by Date started in ascending and descending order',  () => {
    expect(history.getHistoryTableHeaders().get(0).getText()).toBe('Date Started');
    history.getHistoryTableHeadersSpan(0).click();
    history.getHistoryTableHeadersSpan(0).click();
  });

  it('Should sort requests by Date Ended in ascending and descending order', () => {
    expect(history.getHistoryTableHeaders().get(1).getText()).toBe('Date Ended');
    history.getHistoryTableHeadersSpan(1).click();
    history.getHistoryTableHeadersSpan(1).click();
  });

  it('Should sort requests by Duration in ascending and descending order', () => {
    expect(history.getHistoryTableHeaders().get(2).getText()).toBe('Duration');
    history.getHistoryTableHeadersSpan(2).click();
    history.getHistoryTableHeadersSpan(2).click();
  });

  it('Should have Role column contained in the headers', () => {
    expect(history.getHistoryTableHeaders().get(3).getText()).toBe('My Role');
  });

  it('Should sort requests by Rating in ascending and descending order', () => {
    expect(history.getHistoryTableHeaders().get(4).getText()).toBe('Rating');
    history.getHistoryTableHeadersSpan(4).click();
    history.getHistoryTableHeadersSpan(4).click();
  });
});
