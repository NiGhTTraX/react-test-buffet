const baseConfig = require('./base.js');
const path = require('path');


module.exports = function(config) {
  baseConfig(config);

  config.set({
    files: [
      'build/tests-coverage.js'
    ],

    reporters: [
      'coverage'
    ],

    coverageReporter: {
      type: 'html',
      dir: path.join('tests', 'results', 'coverage')
    }
  });
};
