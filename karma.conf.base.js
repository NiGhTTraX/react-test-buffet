module.exports = function(config) {
  return {
    basePath: '',

    frameworks: ['mocha', 'chai', 'sinon-chai'],

    files: [
      './bind-polyfill.js'  // needed for PhantomJS
    ],

    reporters: [
      'progress'
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
    singleRun: false
  };
};

