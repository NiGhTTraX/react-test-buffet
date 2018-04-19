/**
 * @fileoverview Setup a virtual DOM for testing in NodeJS.
 */
import { JSDOM } from 'jsdom';

// React & jQuery need these.
if (!global.window) {
  global.window = new JSDOM('').window;
  global.document = global.window.document;
  global.navigator = { userAgent: 'node.js' };
}

// React needs this.
if (!global.requestAnimationFrame) {
  global.requestAnimationFrame = function (callback) {
    setTimeout(callback, 0);
  };
}

// SinonJS needs this.
if (!global.HTMLElement) {
  global.HTMLElement = global.window.HTMLElement;
}
