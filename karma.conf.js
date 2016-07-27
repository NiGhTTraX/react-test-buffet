var filePatterns = require('./file-patterns.js'),
    path = require('path');


module.exports = function(config) {
  var opts = require('./karma.conf.base.js')(config),
      bundlePath = path.join(filePatterns.buildPath, filePatterns.bundleName);

  opts.files.push(bundlePath);

  var preprocessors = {};
  preprocessors[bundlePath] = ['sourcemap'];

  opts.preprocessors = preprocessors;

  config.set(opts);
};

