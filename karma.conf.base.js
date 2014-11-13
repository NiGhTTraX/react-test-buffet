module.exports = function(config) {
  return {
    basePath: '',

    frameworks: ['mocha', 'chai', 'sinon-chai'],

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
    singleRun: false
  };
};

