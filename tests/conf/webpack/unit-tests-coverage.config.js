var config = require('./unit-tests.config.js');


config.output.filename = 'tests-coverage.js';

config.module.preLoaders.push({
  test: /\.jsx?$/,
  exclude: [
    /node_modules/,
    /tests/
  ],
  loader: 'babel-istanbul'
});


module.exports = config;
