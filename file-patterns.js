var path = require('path');


module.exports = {
  setupEntrypoint: path.join(__dirname, 'tests', 'setup.js'),
  testFiles:  path.join(__dirname, 'tests', 'components', '**', '*.js'),
  srcFiles: path.join(__dirname, 'src', '**', '*.jsx'),
  bindPolyfill: path.join(__dirname, 'bind-polyfill.js'),
  buildPath: path.join(__dirname, 'build'),
  bundleName: 'tests.js',
  bundleInstrumentedName: 'tests-coverage.js'
};

