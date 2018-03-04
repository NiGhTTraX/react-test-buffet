/* eslint-disable import/prefer-default-export */
import { remote } from 'webdriverio';
import Mugshot from 'mugshot';
import WebdriverIOAdapter from 'mugshot-webdriverio';
import path from 'path';
import fs from 'fs';
import { expect } from 'chai';
import {
  runnerAfter,
  runnerBefore,
  runnerBeforeEach,
  runnerAfterEach,
  runnerIt,
  runnerDescribe
} from './test-runner.js';

const { BROWSER = 'chrome', SELENIUM_HOST = 'selenium' } = process.env;

let suiteNesting = 0;

// These will hold root suite level instances. Since most, if not all test
// runners run tests inside of a suite sequentially and since we only set
// up the browser once per root test suite, these should be "thread safe".
let rootSuiteBrowser, rootSuiteMugshot;

/**
 * Run your acceptance tests in a fresh Selenium session.
 *
 * Nested calls will preserve the root session.
 *
 * Tests and hooks will receive the browser instance.
 *
 * @param {String} name
 * @param {() => void} definition
 */
export function describe(name, definition) {
  suiteNesting++;

  runnerDescribe(name, function() {
    // We only want to set up hooks once - for the root suite.
    suiteNesting === 1 && setupHooks();

    definition();
  });

  suiteNesting--;
}

/**
 * @param {String} [name]
 * @param {(Webdriver) => Promise|undefined} definition
 */
export function beforeEach(name, definition) {
  /* eslint-disable no-param-reassign */
  if (!definition) {
    definition = name;
    name = undefined;
  }

  runnerBeforeEach(name, function() {
    return definition(rootSuiteBrowser);
  });
}

/**
 * @param {String} name
 * @param {(Webdriver) => Promise|undefined} definition
 */
export function it(name, definition) {
  runnerIt(name, () => definition(rootSuiteBrowser));
}

/**
 * Perform a visual test alongside a normal test.
 *
 * The visual test will not be performed if the test in `definition` fails.
 *
 * @param {String} name The name of the test. The screenshot will be taken under
 *   the full test name (including any parent suite's name(s)).
 * @param {(Webdriver) => Promise|undefined} definition
 */
export function vit(name, definition) {
  runnerIt(name, function() {
    return Promise.resolve(definition(rootSuiteBrowser))
      .then(() => {
        // Don't want to make debugging tests more noisy than it needs to be.
        if (process.env.DEBUG) {
          return;
        }

        // eslint-disable-next-line consistent-return
        return checkForVisualChanges(this.test.fullTitle(), '.todoapp');
      });
  });
}

/**
 * @param {String} name
 * @param {CSSSelector} selector
 *
 * @returns {Promise<undefined>}
 */
async function checkForVisualChanges(name, selector = 'body > *') {
  return new Promise((resolve, reject) => {
    rootSuiteMugshot.test({ name, selector }, (err, result) => {
      if (err) {
        return reject(err);
      }

      expect(result.isEqual, 'Visual changes detected. Check screenshots').to.be.true;

      return resolve();
    });
  });
}

function setupHooks() {
  runnerBefore('Connect to Selenium', function () {
    this.timeout(10 * 1000);

    const options = {
      host: SELENIUM_HOST,
      desiredCapabilities: { browserName: BROWSER }
    };

    rootSuiteBrowser = remote(options).init();

    const adapter = new WebdriverIOAdapter(rootSuiteBrowser);

    rootSuiteMugshot = new Mugshot(adapter, {
      rootDirectory: path.join(__dirname, 'screenshots', BROWSER),
      acceptFirstBaseline: false
    });

    return rootSuiteBrowser;
  });

  runnerAfter('End session', function () {
    return rootSuiteBrowser.end();
  });

  runnerBeforeEach('Wait for app to render', function() {
    return rootSuiteBrowser.url('http://app:3000/')
    // Wait for webpack to build the app.
      .then(() => rootSuiteBrowser.waitForVisible('.todoapp', 5 * 1000));
  });

  process.env.NODE_ENV === 'tests' && runnerAfterEach('Collect coverage', async function () {
    const { value: coverage } = await rootSuiteBrowser.execute(function getCoverage() {
      return JSON.stringify(window.__coverage__);
    });

    const name = this.currentTest.fullTitle();

    fs.writeFileSync(
      path.join(__dirname, 'results', 'coverage', `${BROWSER}_${name}.json`),
      coverage
    );
  });
}
