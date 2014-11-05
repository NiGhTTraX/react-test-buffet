var chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    path = require('path'),
    React = require('react');


global.expect = chai.expect;


chai.use(sinonChai);


beforeEach(function() {
  /**
   * Prepare a container to mount the component before each test.
   */

  this.container = document.createElement('div');
});


afterEach(function() {
  /**
   * Unmount the component after each test.
   */

  React.unmountComponentAtNode(this.container);
});

