/**
 * @fileoverview Setup a virtual DOM for testing in NodeJS.
 */
import { JSDOM } from 'jsdom';


// React needs these.
global.window = new JSDOM('').window;
global.document = global.window.document;
global.navigator = {
  userAgent: 'node.js'
};

// SinonJS needs this.
global.HTMLElement = global.window.HTMLElement;
