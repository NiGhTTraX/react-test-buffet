var chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    path = require('path'),
    React = require('react');


global.expect = chai.expect;


chai.use(sinonChai);


beforeEach(function() {
  /**
   * Prepare stuff that you might need in tests.
   *
   * Create a simple div container in which you can mount your component. If you
   * mount it in that container, it will automatically be unmounted when the
   * test finishes.
   *
   * Also, create a sinon sandbox to use to create spies and stubs that are
   * cleaned up after the test finishes.
   */

  this.sandbox = sinon.sandbox.create();
  this.container = document.createElement('div');
});


afterEach(function() {
  /**
   * Do some cleaning up.
   *
   * Unmount the component found in the container and clear the sinon sandbox.
   */

  React.unmountComponentAtNode(this.container);
  this.sandbox.restore();
});

