import { remote } from 'webdriverio';
import Mugshot from 'mugshot';
import WebdriverIOAdapter from 'mugshot-webdriverio';
import path from 'path';
import fs from 'fs';

const { BROWSER = 'chrome', SELENIUM_HOST = 'selenium' } = process.env;
let mugshot;

before('Connecting to Selenium', function() {
  this.timeout(10 * 1000);

  const options = {
    host: SELENIUM_HOST,
    desiredCapabilities: { browserName: BROWSER }
  };

  const client = remote(options).init();
  const adapter = new WebdriverIOAdapter(client);

  mugshot = new Mugshot(adapter, {
    rootDirectory: path.join(__dirname, 'screenshots', BROWSER),
    acceptFirstBaseline: false
  });

  this.browser = client;

  return client;
});

async function checkForVisualChanges(test, name, selector = '.todoapp') {
  return new Promise(resolve => {
    try {
      mugshot.test({ name, selector }, (err, result) => {
        if (err) {
          test.error(err);
          resolve();
          return;
        }

        if (!result.isEqual) {
          // If we reject the promise Mocha will halt the suite. Workaround from
          // https://github.com/mochajs/mocha/issues/1635#issuecomment-191019928
          test.error(new Error('Visual changes detected. Check screenshots'));
        }

        resolve();
      });
    } catch (e) {
      test.error(e);
      resolve();
    }
  });
}

beforeEach('Waiting for app to render', function() {
  return this.browser.url('http://app:3000/')
    // Wait for webpack to build the app.
    .then(() => this.browser.waitForVisible('.todoapp', 5 * 1000));
});

afterEach(function() {
  // Screenshots failing will make debugging noisier than it needs to be.
  if (process.env.DEBUG) {
    return;
  }

  if (this.currentTest.state !== 'passed') {
    return;
  }

  // eslint-disable-next-line consistent-return
  return checkForVisualChanges(this.test, this.currentTest.fullTitle());
});

if (process.env.NODE_ENV === 'tests') {
  afterEach('coverage', async function() {
    const { value: coverage } = await this.browser.execute(function getCoverage() {
      return JSON.stringify(window.__coverage__);
    });

    const name = this.currentTest.fullTitle();

    fs.writeFileSync(
      path.join(__dirname, 'results', 'coverage', `${BROWSER}_${name}.json`),
      coverage
    );
  });
}

after(function() {
  return this.browser.end();
});
