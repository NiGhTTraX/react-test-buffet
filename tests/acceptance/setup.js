import { remote } from 'webdriverio';


before(function() {
  this.timeout(10 * 1000);

  const options = {
    host: 'selenium',
    desiredCapabilities: { browserName: 'chrome' }
  };

  this.client = remote(options).init();

  return this.client;
});

beforeEach(function() {
  return this.client.url('http://app:3000/')
    // Wait for webpack to build the app.
    .then(() => this.client.waitForVisible('.todoapp', 5 * 1000));
});


after(function() {
  return this.client.end();
});
