var filePatterns = require('./file-patterns.js');


module.exports = function(config) {
  var opts = require('./karma.conf.base.js')(config),
      bundlePath = filePatterns.buildPath + filePatterns.bundleInstrumentedName;

  opts.files.push(bundlePath);

  var preprocessors = {};
  preprocessors[bundlePath] = ['sourcemap'];
  opts.preprocessors = preprocessors;

  opts.reporters.push('coverage');

  config.set(opts);
};

