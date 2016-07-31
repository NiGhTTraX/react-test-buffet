/**
 * Entry point for test setup code.
 *
 * Require all your setup modules here while enforcing the order between them.
 */

import './setup/sandbox.js';
import './setup/chai.js';
import './setup/react-warnings.js';
import { unmount } from './helpers.js';


// Clean up the rendering container between tests.
afterEach(function() {
  unmount();
});

// Clean up the sandbox between tests. It's important that we clean it up after
// unmounting the currently mounted component so that methods that were stubbed,
// and are called at unmounting, don't get restored before the component is
// unmounted.
afterEach(function() {
  sandbox.restore();
});
