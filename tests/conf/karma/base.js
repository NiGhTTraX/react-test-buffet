module.exports = function(config) {
  config.set({
    basePath: '../../../',

    // We only need mocha here. chai and sinon/sinon-chai are required in the
    // test files.
    frameworks: ['mocha'],

    files: [
      'build/tests.js'
    ],

    preprocessors: {
      'build/tests.js': 'sourcemap'
    },

    reporters: [
      'mocha'
    ],

    mochaReporter: {
      output: 'minimal'
    },

    browsers: [
      'Firefox',
      'Chrome'
    ],

    port: 9876,
    colors: true,
    autoWatch: false,
    singleRun: true
  });
};
