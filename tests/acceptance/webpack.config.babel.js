import path from 'path';
import merge from 'lodash.merge';
import baseConfig from '../../webpack.base.js';


export default merge({}, baseConfig, {
  entry: path.join(__dirname, 'index.js'),

  output: {
    filename: 'acceptance.js'
  }
});
