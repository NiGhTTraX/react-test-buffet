module.exports = {
  componentPaths: ['../src/components'],
  webpackConfigPath: '../src/webpack.config.dev.js',
  fixturePaths: ['./fixtures'],
  // TODO: move the styles to the components themselves
  globalImports: ['../node_modules/todomvc-app-css/index.css'],
  publicPath: './',
  hmrPlugin: false
};
