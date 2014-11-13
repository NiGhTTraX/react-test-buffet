var filePatterns = require('./file-patterns.js');


module.exports = function(config) {
  var opts = require('./karma.conf.base.js')(config),
      bundlePath = filePatterns.buildPath + filePatterns.bundleInstrumentedName;

  opts.files.push('./bind-polyfill.js');  // needed for PhantomJS

  opts.files.push(bundlePath);

  var preprocessors = {};
  preprocessors[bundlePath] = ['sourcemap'];
  opts.preprocessors = preprocessors;

  opts.browsers = ['PhantomJS'];

  opts.reporters.push('junit');

  opts.reporters.push('coverage');
  opts.coverageReporter = {
    type: 'cobertura'
  };

  opts.singleRun = true;

  config.set(opts);
};


