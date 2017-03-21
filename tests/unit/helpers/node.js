/**
 * @fileoverview Setup a virtual DOM for testing in NodeJS.
 */
import { jsdom } from 'jsdom';


// React needs these.
global.document = jsdom('');
global.window = document.defaultView;
global.navigator = {
  userAgent: 'node.js'
};

// SinonJS needs this.
global.HTMLElement = global.window.HTMLElement;
