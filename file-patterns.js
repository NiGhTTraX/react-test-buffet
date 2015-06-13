module.exports = {
  setupEntrypoint: './tests/setup.js',
  testFiles: './tests/components/**/*.js',
  srcFiles: './src/**/*.jsx',
  bindPolyfill: './bind-polyfill.js',
  buildPath: './build/',
  bundleName: 'tests.js',
  bundleInstrumentedName: 'tests-instrumented.js'
};

