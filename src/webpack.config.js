const path = require('path');
const { HotModuleReplacementPlugin, NoEmitOnErrorsPlugin } = require('webpack');


module.exports = {
  entry: [
    path.join(__dirname, 'index.dev.jsx')
  ],

  output: {
    filename: 'app.js',
    path: path.join(__dirname, '..', 'build'),
    publicPath: '/build/'
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
      test: /\.css$/,
      // Not excluding node_modules because we can import CSS npm packages.
      use: ['style-loader', 'css-loader']
    }]
  },

  plugins: [
    new HotModuleReplacementPlugin(),
    new NoEmitOnErrorsPlugin()
  ]
};
