module.exports = {
  componentPaths: ['../src/components'],
  webpackConfigPath: '../src/webpack.config.dev.js',
  fixturePaths: ['./fixtures'],
  // TODO: remove this and have every component depend on it
  // https://github.com/react-cosmos/react-cosmos/pull/364
  globalImports: ['../src/index.less'],
  publicPath: './',
  hmrPlugin: false
};
