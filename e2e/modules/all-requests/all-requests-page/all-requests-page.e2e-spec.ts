import { browser, by, element } from 'protractor';

import { AllRequestsPage } from './all-requests-page.po';
import { LoginPage } from '../../shared/login/login.po';

describe('All requests page', () => {
  let allRequests: AllRequestsPage;
  const login = new LoginPage();

  beforeAll(() => {
    allRequests = new AllRequestsPage();
    allRequests.navigateToAllRequestsPage();
  })

  afterAll(() => {
    browser.waitForAngularEnabled(false);
  })

  it('Should be on the all requests pool page', () => {
    expect(browser.driver.getCurrentUrl()).toContain('/all-requests');
  });

  it('should set date filters', async () => {
    const calenderFilterRequests = await allRequests.getCalenderFilterDatePickers();
    calenderFilterRequests[0].click();

    const startDateElements = await allRequests.getDates();
    startDateElements[0].click();
    const startDateText = await startDateElements[0].getText();
    const startDate = parseInt(startDateText, 10);

    calenderFilterRequests[1].click();
    const endDateElements = await allRequests.getDates();
    endDateElements[1].click();
    const endDateText = await endDateElements[1].getText();
    const endDate = parseInt(endDateText, 10);

    const firstDateCellText = await allRequests.getDateCells().first().getText();
    const firstTextArray = firstDateCellText.split(' ');
    const firstRowDate = parseInt(firstTextArray[1], 10);

    const lastDateCellText = await allRequests.getDateCells().first().getText();
    const lastTextArray = lastDateCellText.split(' ');
    const lastRowDate = parseInt(lastTextArray[1], 10);
    expect(startDate <= firstRowDate || startDate >= lastRowDate && endDate <= firstRowDate || endDate <= lastRowDate)
      .toBeTruthy();
    browser.actions().mouseMove(allRequests.getDateCells().first()).perform();
  })

  it('should activate open status filter', async () => {
    const openRequests = await allRequests.getStatisticsElements().get(1).element(by.tagName('span')).getText();
    allRequests.getOpenRequestsFilter().click();
    const tableRows = await allRequests.getDateCells().count();
    expect(allRequests.getOpenRequestsFilter().getAttribute('class')).toContain('active');
    expect(parseInt(openRequests, 10)).toEqual(tableRows);
  })
});
