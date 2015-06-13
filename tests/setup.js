/**
 * Entry point for test setup code.
 *
 * Require all your setup modules here while enforcing the order between them.
 */

// Check if we're in a browser. If we're not, setup jsdom.
if (typeof document === 'undefined') {
  require('./setup/jsdom.js');
}

require('./setup/component-mounting.js');

// The sandbox should be cleared after the component has unmounted.
require('./setup/sandbox.js');

require('./setup/chai.js');
