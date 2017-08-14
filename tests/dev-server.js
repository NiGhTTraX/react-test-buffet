/* eslint-disable no-console */
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();

const PORT = process.env.DEV_SERVER_PORT || 3000;
const configPath = process.env.WEBPACK_CONFIG || '../src/webpack.config.dev';

// eslint-disable-next-line import/no-dynamic-require
const config = require(configPath);
const compiler = webpack(config);


app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

// TODO: remove this once we move the styles to the components themselves
app.use('/node_modules',
        express.static(path.join(__dirname, '..', 'node_modules'))
);

app.use('*', (req, res, next) => {
  // Make it work with the webpack HTML plugin. From
  // https://github.com/jantimon/html-webpack-plugin/issues/145#issuecomment-170554832.
  const filename = path.join(compiler.outputPath, 'index.html');

  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) {
      next(err);
      return;
    }

    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
  });
});

app.listen(PORT, err => {
  if (err) {
    throw err;
  }

  console.log(`Listening at http://localhost:${PORT}`);
  console.info('Building the bundle...');
});
