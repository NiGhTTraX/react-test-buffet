import path from 'path';
import baseConfig from '../webpack.base.js';
import merge from 'lodash.merge';


export default merge({}, baseConfig, {
  entry: path.join(__dirname, 'index.jsx'),

  output: {
    filename: 'app.js'
  }
});
