import { browser, by, element, protractor, $ } from 'protractor';

import { AllRequestsPage } from './all-requests-page.po';
import { LoginPage } from '../../shared/login/login.po';

describe('All requests page', () => {
  let allRequests: AllRequestsPage;
  const login = new LoginPage();

  beforeAll(() => {
    allRequests = new AllRequestsPage();
    allRequests.navigateToAllRequestsPage();
    browser.waitForAngularEnabled(false);
  })
  const EC = protractor.ExpectedConditions;
  it('Should be on the all requests pool page', () => {
    expect(browser.driver.getCurrentUrl()).toContain('/all-requests');
  });

  it('should set date filters', () => {
    const startDateCalenderFilterRequests = allRequests.getStartCalenderFilterDatePickers();
    const endDateCalenderFilterRequests = allRequests.getEndDateCalenderFilterDatePickers();

    browser.wait(EC.elementToBeClickable(startDateCalenderFilterRequests), 5000,
                 'start-date filter taking too long to appear in the DOM');
    startDateCalenderFilterRequests.click();

    browser.wait(EC.presenceOf(allRequests.getDateFilters().get(0)), 5000,
                 '.week-date taking too long to appeear in the DOM');
    allRequests.getDateFilters().get(1).getText().then((startDate) => {
      const selectedStartDate = startDate;

      browser.wait(EC.elementToBeClickable(endDateCalenderFilterRequests), 5000,
                   'date filter taking too long to appear in the DOM');
      endDateCalenderFilterRequests.click();

      browser.wait(EC.presenceOf(allRequests.getDateFilters().last()), 5000,
                   'date filter taking too long to appvdsvsd ear in the DOM');
      allRequests.getDateFilters().get(1).getText().then((endDate) => {
        const selectedEndateDate = endDate;
        expect(startDate === endDate);
      });
    });
  });

  it('should activate open status filter', () => {
    const openRequests = allRequests.getOpenRequestsFilter();
    browser.wait(EC.elementToBeClickable(openRequests), 10000,
                 'Request filter card is taking too long to appear in the DOM');
    openRequests.click();
    browser.sleep(3000);
    browser.wait(EC.presenceOf(allRequests.getOpenRequestsFilterSpan()), 10000,
                 'open request span taking too long to appear in the DOM');
    allRequests.getStatusFilter().getText().then((numberOfRequests) => {
      allRequests.getDateCells().then((tableRows) => {
        const tableRowsCount = tableRows.length
        expect(allRequests.getOpenRequestsFilter().getAttribute('class')).toContain('active');
        expect(parseInt(numberOfRequests, 10)).toEqual(tableRowsCount);
      });
    });
  });
});
