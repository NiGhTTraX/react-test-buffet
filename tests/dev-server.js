/* eslint-disable no-console */
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('../src/webpack.config.dev');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const compiler = webpack(config);

const PORT = process.env.DEV_SERVER_PORT || 3000;


app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

// TODO: remove this once we move the styles to the components themselves
app.use('/node_modules',
        express.static(path.join(__dirname, '..', 'node_modules'))
);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(PORT, err => {
  if (err) {
    throw err;
  }

  console.log(`Listening at http://localhost:${PORT}`);
  console.info('Building the bundle...');
});
