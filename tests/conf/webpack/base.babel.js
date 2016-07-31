import path from 'path';


export default {
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
