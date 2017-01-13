exports.config = {
  host: 'selenium',

  specs: [
    './tests/acceptance/specs/**/*.spec.js'
  ],

  maxInstances: 10,
  capabilities: [{
    browserName: 'chrome'
  }],

  sync: true,
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
    ui: 'bdd',
    compilers: ['js:babel-register'],
    timeout: 10 * 1000
  },

  reporters: ['dot'],

  beforeTest: function resetApp() {
    browser.url('http://app:3000')
      .waitForVisible('.todoapp', 5 * 1000);
  }
};
