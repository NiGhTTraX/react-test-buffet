/**
 * @fileoverview Setup a virtual DOM for testing in NodeJS.
 */
import { jsdom } from 'jsdom';


global.document = jsdom('');
global.window = document.defaultView;
global.navigator = {
  userAgent: 'node.js'
};
