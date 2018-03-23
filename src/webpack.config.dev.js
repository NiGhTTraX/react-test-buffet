const path = require('path');
const baseConfig = require('./webpack.config.js');

const entry = [
  // TODO: remove this?
  path.join(__dirname, '..', 'tests', 'node', 'helpers', 'react-warnings.js'),
  ...baseConfig.entry
];

if (process.env.NODE_ENV === 'coverage') {
  entry.push(path.join(__dirname, '..', 'tests', 'gui', 'styles.css'));
}

module.exports = Object.assign({}, baseConfig, {
  mode: 'development',
  devtool: 'sourcemap',

  entry,

  devServer: {
    host: '0.0.0.0',
    port: 3000,
    disableHostCheck: true
  }
});
