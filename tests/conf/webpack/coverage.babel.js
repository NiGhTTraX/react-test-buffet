import config from './base.babel.js';


config.output.filename = 'tests-coverage.js';

config.module.preLoaders.push({
  test: /\.jsx?$/,
  exclude: [
    /node_modules/,
    /tests/
  ],
  loader: 'babel-istanbul'
});

export default config;
