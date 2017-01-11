const path = require('path');


module.exports = {
  entry: path.join(__dirname, 'index.jsx'),

  output: {
    filename: 'app.js',
    path: path.join(__dirname, '..', 'build'),
    publicPath: '/build/'
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  devtool: 'sourcemap',

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      loader: 'style!css'
    }]
  }
};
