module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['mocha', 'chai', 'sinon-chai'],

    files: [
      'build/tests.js'
    ],

    reporters: [
      'progress',
      'coverage'
    ],

    browsers: [
      'Firefox',
      'Chrome',
      'PhantomJS'
    ],

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    singleRun: true
  });
};

