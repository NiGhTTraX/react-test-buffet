/*
 * @fileoverview Test helpers.
 *
 * The modules imported here may have side effects and the import order is
 * important.
 */
import './react-warnings.js';
import { unmount } from './rendering.js';
import './expect.js';


// Unmount the currently mounted component after each test.
afterEach(function() {
  unmount();
});
