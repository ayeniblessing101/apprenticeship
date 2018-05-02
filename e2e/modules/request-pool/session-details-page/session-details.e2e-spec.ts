import { browser, protractor, by, element } from 'protractor';
import { InProgressPage } from '../../request-pool/in-progress/in-progress.po';
import { SessionPage } from './session-details.po';

const EC = protractor.ExpectedConditions;

describe('Session Detail page', () => {
  const comment = 'Nice one';

  const inProgressPage = new InProgressPage();
  const sessionPage = new SessionPage();
  beforeEach(() => {
    inProgressPage.navigateToInProgressPage();
  });

  it('should be able to log a Session', () => {
    browser.wait(EC.elementToBeClickable(sessionPage.getSingleRequest(0)),
                 5000, '#request-in-progress should be clickable');
    sessionPage.getSingleRequest(0).click();

    browser.wait(EC.elementToBeClickable(sessionPage.getSessionButton('.log-session')),
                 10000, '.log-session should be clickable');
    sessionPage.getSessionButton('.log-session').click();

    browser.wait(EC.visibilityOf(sessionPage.getElementByTagName('star-rating-comp')),
                 5000, 'star-rating-comp should be visible');
    sessionPage.getStarRatings();

    browser.wait(EC.visibilityOf(sessionPage.getElementAttribute('#comment')),
                 5000, '#comment should be visible');
    sessionPage.getElementAttribute('#comment').sendKeys(comment);

    browser.wait(EC.elementToBeClickable(sessionPage.getElementAttribute('#submit-session')),
                 3000, '#submit-session should be clickable');
    sessionPage.getElementAttribute('#submit-session').click();

    browser.wait(EC.elementToBeClickable(sessionPage.getAlertClose()),
                 5000, '.close-button should be clickable');
    sessionPage.getAlertClose().click();

    expect(sessionPage.getSessionButton('.log-session').getText()).toEqual('Edit Session');
  });

  it('should be able to confirm an already logged', () => {
    browser.get('http://lenken-dev.andela.com:4200/request-pool/in-progress/29');

    browser.wait(EC.elementToBeClickable(sessionPage.getSessionButton('.confirm-session')),
                 6000, '.confirm-session should be clickable');
    sessionPage.getSessionButton('.confirm-session').click();

    browser.wait(EC.visibilityOf(sessionPage.getElementByTagName('star-rating-comp')),
                 5000, 'star-rating-comp should be visible');
    sessionPage.getStarRatings();

    browser.wait(EC.elementToBeClickable(sessionPage.getElementAttribute('#submit-session')),
                 5000, 'submit-session button should be clickable');
    sessionPage.getElementAttribute('#submit-session').click();

    browser.wait(EC.elementToBeClickable(sessionPage.getElementAttribute('.close-button')),
                 5000, 'close-button modal should be clickable')
    sessionPage.getElementAttribute('.close-button').click();

    expect(sessionPage.getSessionButton('.log-session').getText()).toEqual('Log Session');
  })

  it('should be able to reject an already logged', () => {
    browser.get('http://lenken-dev.andela.com:4200/request-pool/in-progress/26');

    browser.wait(EC.elementToBeClickable(sessionPage.getSessionButton('.confirm-session')),
                 6000, '.confirm-session should be clickable');
    sessionPage.getSessionButton('.confirm-session').click();

    browser.wait(EC.elementToBeClickable(sessionPage.getElementAttribute('#reject-session')),
                 5000, '#reject-session should be clickable')
    sessionPage.getElementAttribute('#reject-session').click();

    expect(sessionPage.getSessionButton('.log-session').getText()).toEqual('Log Session');
    browser.sleep(3000);
  });
});
