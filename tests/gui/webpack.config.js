const baseConfig = require('../../src/webpack.config.dev.js');
const path = require('path');


module.exports = Object.assign({}, baseConfig, {
  entry: [path.join(__dirname, 'styles.css')].concat(baseConfig.entry)
});
