import { browser } from 'protractor';
import { PoolRecords } from './pool-records.po';

describe('Pool Records', () => {
  const poolRecords = new PoolRecords();
  beforeAll(() => {
    poolRecords.navigateToPoolPage();
    browser.sleep(3000);
  });

  it('Should have table headers', () => {
    expect(poolRecords.getRequestsPoolTableHeaders()).toBeTruthy();
    browser.sleep(2000);
  });

  it('Should sort requests by Title in ascending and descending order', () => {
    expect(poolRecords.getRequestsPoolTableHeaders().get(0).getText()).toBe('Request');
    poolRecords.getRequestsPoolTableHeaders().get(0).$('span').click();
    browser.sleep(2000);
    poolRecords.getRequestsPoolTableHeaders().get(0).$('span').click();
    browser.sleep(2000);
  });

  it('Should sort requests by Duration in ascending and descending order', () => {
    expect(poolRecords.getRequestsPoolTableHeaders().get(3).getText()).toBe('Duration');
    poolRecords.getRequestsPoolTableHeaders().get(3).$('span').click();
    browser.sleep(2000);
    poolRecords.getRequestsPoolTableHeaders().get(3).$('span').click();
    browser.sleep(2000);
  })

  it('Should sort requests by Date added in ascending and descending order', () => {
    expect(poolRecords.getRequestsPoolTableHeaders().get(4).getText()).toBe('Date Added');
    poolRecords.getRequestsPoolTableHeaders().get(4).$('span').click();
    browser.sleep(2000);
    poolRecords.getRequestsPoolTableHeaders().get(4).$('span').click();
    browser.sleep(2000);
  });

  it('Should sort requests by Location in ascending and descending order', () => {
    expect(poolRecords.getRequestsPoolTableHeaders().get(5).getText()).toBe('Location');
    poolRecords.getRequestsPoolTableHeaders().get(5).$('span').click();
    browser.sleep(2000);
    poolRecords.getRequestsPoolTableHeaders().get(5).$('span').click();
    browser.sleep(2000);
  })
});
