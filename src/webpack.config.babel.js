import path from 'path';
import merge from 'lodash.merge';
import baseConfig from '../webpack.base.js';


export default merge({}, baseConfig, {
  entry: path.join(__dirname, 'index.jsx'),

  output: {
    filename: 'app.js'
  }
});
