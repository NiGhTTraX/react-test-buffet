const { config } = require('./wdio.conf.js');

exports.config = Object.assign({}, config, {
  // Start only a single browser for easy monitoring via VNC.
  maxInstances: 1,

  mochaOpts: Object.assign({}, config.mochaOpts, {
    timeout: 24 * 60 * 60 * 1000
  })
});
