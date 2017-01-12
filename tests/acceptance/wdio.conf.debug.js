const { config } = require('./wdio.conf.js');

exports.config = Object.assign({}, config, {
  // Start only a single browser for easy monitoring via VNC.
  maxInstances: 1
});
