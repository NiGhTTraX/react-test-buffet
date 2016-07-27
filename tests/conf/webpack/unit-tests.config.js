var path = require('path');


module.exports = {
  entry: [
    path.join(__dirname, '..', '..', 'setup.js'),
    path.join(__dirname, '..', '..', 'index.js')
  ],

  output: {
    filename: 'tests.js',
    path: path.join(__dirname, '..', '..', '..', 'build')
  },

  devtool: 'cheap-module-sourcemap',

  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: /node_modules/
    }]
  }
};
