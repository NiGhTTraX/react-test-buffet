module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['mocha', 'chai', 'sinon-chai'],

    files: [
      './bind-polyfill.js',  // needed for PhantomJS
      'build/tests.js'
    ],

    preprocessors: {
      'build/tests.js': ['sourcemap']
    },

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

