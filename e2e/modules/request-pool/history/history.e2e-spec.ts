import { browser } from 'protractor';
import { History } from './history.po';

describe('History', () => {
  const history = new History();
  beforeAll(() => {
    history.navigateToHistoryPage();
  });

  it('Should have history table headers', () => {
    expect(history.getHistoryTableHeaders()).toBeTruthy();
  });

  it('Should sort requests by Title in ascending and descending order',  () => {
    expect(history.getHistoryTableHeaders().get(0).getText()).toBe('Request');
    history.getHistoryTableHeaders().get(0).$('span').click();
    browser.sleep(1000);
    history.getHistoryTableHeaders().get(0).$('span').click();
    browser.sleep(1000);
  });

  it('Should sort requests by Date started in ascending and descending order', () => {
    expect(history.getHistoryTableHeaders().get(2).getText()).toBe('Date Started');
    history.getHistoryTableHeaders().get(2).$('span').click();
    browser.sleep(1000);
    history.getHistoryTableHeaders().get(2).$('span').click();
    browser.sleep(1000);
  });

  it('Should sort requests by Date ended in ascending and descending order', () => {
    expect(history.getHistoryTableHeaders().get(3).getText()).toBe('Date Ended');
    history.getHistoryTableHeaders().get(3).$('span').click();
    browser.sleep(1000);
    history.getHistoryTableHeaders().get(3).$('span').click();
    browser.sleep(1000);
  });

  it('Should sort requests by Duration in ascending and descending order', () => {
    expect(history.getHistoryTableHeaders().get(4).getText()).toBe('Duration');
    history.getHistoryTableHeaders().get(4).$('span').click();
    browser.sleep(1000);
    history.getHistoryTableHeaders().get(4).$('span').click();
    browser.sleep(1000);
  });

  it('Should sort requests by Role in ascending and descending order', () => {
    expect(history.getHistoryTableHeaders().get(5).getText()).toBe('Role');
    history.getHistoryTableHeaders().get(5).$('span').click();
    browser.sleep(1000);
    history.getHistoryTableHeaders().get(5).$('span').click();
    browser.sleep(1000);
  });

  it('Should sort requests by Rating in ascending and descending order', () => {
    expect(history.getHistoryTableHeaders().get(6).getText()).toBe('Rating');
    history.getHistoryTableHeaders().get(6).$('span').click();
    browser.sleep(1000);
    history.getHistoryTableHeaders().get(6).$('span').click();
    browser.sleep(1000);
  });
});
