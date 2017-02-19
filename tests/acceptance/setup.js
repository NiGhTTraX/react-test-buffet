import { remote } from 'webdriverio';


before(function() {
  this.timeout(10 * 1000);

  const options = {
    host: 'selenium',
    desiredCapabilities: { browserName: 'chrome' }
  };

  global.browser = remote(options).init();

  return global.browser;
});

beforeEach(function() {
  return global.browser.url('http://app:3000/')
    // Wait for webpack to build the app.
    .then(() => global.browser.waitForVisible('.todoapp', 5 * 1000));
});


after(function() {
  return global.browser.end();
});
