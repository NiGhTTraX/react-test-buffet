module.exports = {
  componentPaths: ['../src/components'],
  ignore: [
    /abstract/
  ],
  webpackConfigPath: '../src/webpack.config.dev.js',
  fixturePaths: ['./fixtures'],

  globalImports: ['../src/index.less']
};
