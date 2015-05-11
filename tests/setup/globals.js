var chai = require('chai'),
    sinonChai = require('sinon-chai'),
    sinon = require('sinon');


chai.use(sinonChai);
global.expect = chai.expect;

// Set up a global sinon sandbox which you can use to spy/stub things without
// having to worry about cleanup. The sandbox is restored after every test.
var _sandbox = sinon.sandbox.create();
global.sandbox = _sandbox;
