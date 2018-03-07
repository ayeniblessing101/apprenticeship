// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

/*global jasmine */
var SpecReporter = require('jasmine-spec-reporter').SpecReporter;



exports.config = {
  // seleniumAddress: 'http://localhost:4444/wd/hub',
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://lenken-dev.andela.com:4200',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  useAllAngular2AppRoots: true,
  beforeLaunch: function() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
  },
  onPrepare: function() {
    const expectedConditions = protractor.ExpectedConditions;
    jasmine.getEnv().addReporter(new SpecReporter());
    browser.manage().window().maximize();
    browser.manage().window().setSize(1600,1000);
    browser.ignoreSynchronization = true;

    // login to the application before the test starts running
    browser.driver.get('http://lenken-dev.andela.com:4200/login');
    browser.driver.wait(expectedConditions.visibilityOf($('a')), 3000,
      'The google login button should be showing.');
    browser.driver.findElement(by.tagName('a')).click();

    browser.driver.wait(
      expectedConditions.and(
        expectedConditions.visibilityOf($('#identifierId')),
        expectedConditions.elementToBeClickable($('#identifierNext'))
      ), 3000, 'The google login email address page should have rendered.');
    browser.driver.findElement(by.id('identifierId')).sendKeys('test-user-admin@andela.com');
    browser.driver.findElement(by.id('identifierNext')).click();

    browser.driver.wait(
      expectedConditions.and(
        expectedConditions.visibilityOf($('input[type=password]')),
        expectedConditions.elementToBeClickable($('#passwordNext'))
      ), 3000, 'The google login password page should have rendered.');
    browser.driver.findElement(by.css('input[type=password]')).sendKeys('andela2015');
    browser.driver.findElement(by.id('passwordNext')).click();

    return browser.driver.wait(function() {
      return browser.driver.getCurrentUrl().then(function(url) {
        browser.ignoreSynchronization = false;
        return /request-pool/.test(url);
      });
    }, 10000);
  }
};
