const path = require('path');
const { HotModuleReplacementPlugin, NoErrorsPlugin } = require('webpack');


module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, '..', 'tests', 'unit', 'helpers', 'react-warnings.js'),
    path.join(__dirname, 'index.jsx')
  ],

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
  },

  plugins: [
    new HotModuleReplacementPlugin(),
    new NoErrorsPlugin()
  ]
};
