import { remote } from 'webdriverio';
import Mugshot from 'mugshot';
import WebdriverIOAdapte from 'mugshot-webdriverio';
import path from 'path';


let mugshot;

before(function() {
  this.timeout(10 * 1000);

  const options = {
    host: 'selenium',
    desiredCapabilities: { browserName: 'chrome' }
  };

  global.browser = remote(options).init();

  const adapter = new WebdriverIOAdapte(global.browser);
  mugshot = new Mugshot(adapter, {
    rootDirectory: path.join(__dirname, 'screenshots')
  });

  return global.browser;
});

function takeScreenshot(name, selector = '.todoapp', test) {
  return new Promise((resolve, reject) => {
    try {
      mugshot.test({ name, selector }, (err, result) => {
        if (err) {
          reject(err);
        }

        if (result.isEqual) {
          resolve();
        } else {
          // If we reject the promise Mocha will halt the suite. Workaround from
          // https://github.com/mochajs/mocha/issues/1635#issuecomment-191019928
          test.error(new Error('Visual changes detected. Check screenshots'));
          resolve();
        }
      });
    } catch (e) {
      // These are Mugshot internal errors. Rejecting them here will halt the
      // suite.
      reject(e);
    }
  });
}

beforeEach(function() {
  return global.browser.url('http://app:3000/')
    // Wait for webpack to build the app.
    .then(() => global.browser.waitForVisible('.todoapp', 5 * 1000));
});

afterEach(function() {
  return takeScreenshot(this.currentTest.fullTitle(), '.todoapp', this.test);
});


after(function() {
  return global.browser.end();
});
