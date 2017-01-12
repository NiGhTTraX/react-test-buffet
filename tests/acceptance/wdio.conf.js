exports.config = {
  host: 'selenium',

  specs: [
    './tests/acceptance/specs/**/*.spec.js'
  ],

  maxInstances: 10,
  capabilities: [{
    browserName: 'chrome'
  }],

  sync: false,
  logLevel: 'error',
  coloredLogs: true,
  bail: 0,
  screenshotPath: './tests/acceptance/results/',
  baseUrl: 'http://app:3000',

  waitforTimeout: 10 * 1000,
  connectionRetryTimeout: 90 * 1000,
  connectionRetryCount: 3,

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd'
  },

  reporters: ['dot'],

  beforeTest: function resetApp() {
    return browser.url('http://app:3000')
      .then(() => browser.waitForVisible('.todoapp', 5 * 1000));
  }
};

// Enable ES6.
// https://github.com/webdriverio/webdriverio/issues/600#issuecomment-126233086
require('babel-register');
