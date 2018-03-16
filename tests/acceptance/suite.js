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
 * @param {(Webdriver) => Promise} definition
 */
export function beforeEach(definition) {
  runnerBeforeEach(function() {
    return definition(rootSuiteBrowser);
  });
}

/**
 * Run a test with optional coverage report.
 *
 * @param {String} name
 * @param {(Webdriver) => Promise|undefined} definition
 */
export function it(name, definition) {
  runnerIt(name, function() {
    const promise = Promise.resolve(definition(rootSuiteBrowser));
    const testName = this.test.fullTitle();

    if (process.env.NODE_ENV !== 'tests') {
      return promise;
    }

    return promise.then(() => collectCoverage(testName));
  });
}

/**
 * Perform a visual test alongside a normal test.
 *
 * The visual test will not be performed if the test in `definition` fails.
 *
 * @param {String} name The name of the test. The screenshot will be taken under
 *   the full test name (including any parent suite's name(s)).
 * @param {(Webdriver) => Promise|undefined} definition
 * @param {CSSSelector} selector
 */
export function vit(name, definition, selector = '.todoapp') {
  runnerIt(name, function() {
    const promise = Promise.resolve(definition(rootSuiteBrowser));
    const testName = getSafeFilename(this.test.fullTitle());

    // Don't want to make debugging tests more noisy than it needs to be.
    if (process.env.DEBUG) {
      promise.then(() => checkForVisualChanges(testName, selector));
    }

    if (process.env.NODE_ENV === 'tests') {
      promise.then(() => collectCoverage(testName));
    }

    return promise;
  });
}

/**
 * @param {String} name
 * @param {CSSSelector} selector
 *
 * @returns {Promise<undefined>}
 */
function checkForVisualChanges(name, selector = 'body > *') {
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

/**
 * @param {string} testName
 *
 * @returns {Promise<undefined>}
 */
function collectCoverage(testName) {
  const safeTestName = getSafeFilename(testName);

  return rootSuiteBrowser.execute(function getCoverage() {
    return JSON.stringify(window.__coverage__);
  }).then(({ value: coverage }) => {
    fs.writeFileSync(
      path.join(__dirname, 'results', 'coverage', `${BROWSER}_${safeTestName}.json`),
      coverage
    );
  });
}

/**
 * Turn the given file name into something that's safe to save on the FS.
 *
 * @param {String} fileName
 *
 * @returns {String}
 */
function getSafeFilename(fileName) {
  return fileName
    .replace(/\//g, '_')
    .replace(/ /g, '_')
    .toLowerCase();
}

function setupHooks() {
  runnerBefore(function connectToSelenium() {
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

  runnerAfter(function endSession() {
    return rootSuiteBrowser.end();
  });

  runnerBeforeEach(function waitForRender() {
    return rootSuiteBrowser.url('http://app:3000/')
    // Wait for webpack to build the app.
      .then(() => rootSuiteBrowser.waitForVisible('.todoapp', 5 * 1000));
  });
}
