const path = require('path');
const baseConfig = require('./webpack.config.js');


module.exports = Object.assign({}, baseConfig, {
  mode: 'development',
  devtool: 'sourcemap',

  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    // TODO: remove this?
    path.join(__dirname, '..', 'tests', 'node', 'helpers', 'react-warnings.js'),
    path.join(__dirname, 'index.dev.jsx')
  ]
});
