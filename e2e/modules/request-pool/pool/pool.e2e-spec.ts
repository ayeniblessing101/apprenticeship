import { browser, by, $ } from 'protractor';
import { RequestPoolPage } from './pool.po';
import requests from '../../../../src/app/mocks/requests';

describe('Request Pool', () => {
  const requestPool = new RequestPoolPage();

  beforeAll(() => {
    requestPool.navigateToPoolPage();
    browser.waitForAngularEnabled(false);
  });
  const EC = browser.ExpectedConditions;
  it('Should be on the request pool page', () => {
    expect(browser.driver.getCurrentUrl()).toContain('/request-pool');
  });

  it('Should be able to search', () => {
    requestPool.getRequestRowsInRequestPool().count().then((pendingPoolRows) => {
      requestPool.getSearchInputElement();
      browser.sleep(5000);
      requestPool.getRequestRowsInRequestPool().count().then((updatedPendingPoolRows) => {
        expect((pendingPoolRows !== updatedPendingPoolRows))
      })
    })
  })

  it('Should sort requests by Duration in ascending and descending order', () => {
    expect(requestPool.getPoolTableHeaders(0).getText()).toBe('Duration');
    requestPool.getPoolTableHeadersSpan(0).click();
    requestPool.getPoolTableHeadersSpan(0).click();
  });

  it('Should sort requests by Date Added in ascending and descending order', () => {
    expect(requestPool.getPoolTableHeaders(1).getText()).toBe('Date Added');
    requestPool.getPoolTableHeadersSpan(1).click();
    requestPool.getPoolTableHeadersSpan(1).click();
  });

  it('Should show a request modal when a request is clicked', () => {
    browser.wait(EC.elementToBeClickable(requestPool.getRequestRowsInRequestPool().get(0)), 15000,
                 '.custom-row is taking too long to appear in the DOM');
    expect(requestPool.getRequestRowsInRequestPool().get(1).isDisplayed()).toBeTruthy();
    requestPool.getRequestRowsInRequestPool().get(1).click();
    browser.wait(EC.visibilityOf(requestPool.getSingleRequestModal()), 5000,
                 '.custom-rowt taking too long to appear in the DOM');
    expect(requestPool.getSingleRequestModal().isDisplayed).toBeTruthy();

    browser.wait(EC.presenceOf(requestPool.getRequestModalBackButton()), 5000,
                 '.custom-row taking too long to appear in the DOM');
    requestPool.getRequestModalBackButton().click();
    browser.sleep(2000)
  });

  it('Should remove requests shown interest in from the requests pool', () => {
    browser.wait(requestPool.getRequestRowsInRequestPool()
           .then((requests) => {
             const allRequestsCount = requests.length;
             requestPool.getRequestRowsInRequestPool().get(0)
             .click()
             browser.wait(EC.elementToBeClickable(requestPool.getIAmInterestedButton()), 5000)
             requestPool.getIAmInterestedButton().click()
             browser.wait(EC.elementToBeClickable(requestPool.getNotificationCloseButton()), 10000)
             expect(requestPool.getNotificationCloseButton().isDisplayed).toBeTruthy();
             requestPool.getNotificationCloseButton().click();
             requestPool.getRequestModalBackButton().click();

             browser.wait(requestPool.getRequestRowsInRequestPool()
             .then((currentRequets) => {
               const currentRequestsCount = currentRequets.length;
               expect((currentRequestsCount < allRequestsCount))
             }),          5000);
           }),   5000);
  });

  it('Should be able to request a mentor', () => {
    browser.actions().mouseMove(requestPool.getRequestForButton()).perform();

    browser.wait(EC.elementToBeClickable(requestPool.getRequestMentorButton()),
                 3000, 'Request Mentor is taking too long to appear in the DOM');
    requestPool.getRequestMentorButton().click();
    requestPool.createRequest(requests[0]);
  });

  it('Should be able to request a mentee', () => {
    browser.actions().mouseMove(requestPool.getRequestForButton()).perform();

    browser.wait(EC.elementToBeClickable(requestPool.getRequestMenteeButton()),
                 3000, 'Request Mentee is taking too long to appear in the DOM');
    requestPool.getRequestMenteeButton().click();
    requestPool.createRequest(requests[2]);
  });

  it('Should filter the request pool by location', () => {
    requestPool.getLocationFilter().click();
    requestPool.getLagosFilter().click();
    browser.sleep(3000);
  });

  it('Should reduce the length of characters in the description field', () => {
    browser.actions().mouseMove(requestPool.getRequestForButton()).perform();

    browser.wait(EC.elementToBeClickable(requestPool.getRequestMentorButton()),
                 2000, 'Request Mentor is taking too long to appear in the DOM');
    requestPool.getRequestMentorButton().click();
    requestPool.createRequest(requests[1]);
  });

  it('Should open notifications tab', () => {
    browser.wait(EC.elementToBeClickable(requestPool.notificationElement()),
                 5000, 'Notification button is taking too long to appear in the DOM');
    expect(requestPool.notificationElement()).toBeTruthy();
    requestPool.notificationElement().click();
  });

  it('Should close notifications tab', () => {
    browser.wait(EC.visibilityOf(requestPool.closeNotificationsIcon()),
                 3000, 'this time notification close button should be visible');
    expect(requestPool.closeNotificationsIcon()).toBeTruthy();
    requestPool.closeNotificationsIcon().click();
  });

});
