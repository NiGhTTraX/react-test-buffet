module.exports = function(config) {
  return {
    basePath: '',

    // We only need mocha here. chai and sinon/sinon-chai are required in the
    // test files.
    frameworks: ['mocha'],

    files: [],

    reporters: [
      'progress'
    ],

    browsers: [
      'Firefox',
      'Chrome'
    ],

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    singleRun: true
  };
};

