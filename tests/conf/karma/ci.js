const coverageConfig = require('./coverage.js');
const path = require('path');


module.exports = function(config) {
  coverageConfig(config);

  config.set({
    browsers: [
      'PhantomJS'
    ],

    reporters: [
      'mocha',
      'junit',
      'coverage'
    ],

    junitReporter: {
      outputDir: path.join('tests', 'results'),
      outputFile: 'results.xml',
      suite: 'Unit tests',
      useBrowserName: false
    }
  });
};
