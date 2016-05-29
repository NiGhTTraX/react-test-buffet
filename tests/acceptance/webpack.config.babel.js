import path from 'path';
import baseConfig from '../../webpack.base.js';
import merge from 'lodash.merge';


export default merge({}, baseConfig, {
  entry: path.join(__dirname, 'index.js'),

  output: {
    filename: 'acceptance.js'
  }
});
