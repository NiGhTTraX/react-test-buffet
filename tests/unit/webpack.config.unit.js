const path = require('path');
const merge = require('lodash.merge');
const devConfig = require('../../src/webpack.config.dev.js');


module.exports = merge({}, devConfig, {
  entry: path.join(__dirname, 'index.js'),

  output: {
    filename: 'unit.js'
  }
});
