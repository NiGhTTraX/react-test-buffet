const path = require('path');


module.exports = {
  entry: path.join(__dirname, 'index.js'),

  output: {
    filename: 'unit.js',
    path: path.join(__dirname, 'build')
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  devtool: 'sourcemap',

  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }, {
      // Don't bundle static assets.
      test: /\.css$/,
      exclude: /node_modules/,
      use: [path.join(__dirname, 'noop-loader.js')]
    }]
  }
};
