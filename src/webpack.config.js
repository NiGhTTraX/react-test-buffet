const path = require('path');
const { NoEmitOnErrorsPlugin } = require('webpack');


module.exports = {
  entry: [
    path.join(__dirname, 'index.jsx')
  ],

  output: {
    filename: 'app.js',
    path: path.join(__dirname, '..', 'build'),
    publicPath: '/build/'
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      use: ['style-loader', 'css-loader']
    }]
  },

  plugins: [
    new NoEmitOnErrorsPlugin()
  ]
};
