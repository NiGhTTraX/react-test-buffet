/**
 * Set up a global sinon sandbox which you can use to spy/stub things without
 * having to worry about cleanup.
 */
import sinon from 'sinon';


const _sandbox = sinon.sandbox.create();

global.sandbox = _sandbox;
