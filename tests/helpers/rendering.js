/**
 * @fileoverview Test helpers for mounting/unmounting components.
 *
 * This module has side effects.
 */

import ReactDOM from 'react-dom';

const _container = document.createElement('div');


/**
 * Render the given component.
 *
 * @param {ReactElement} element
 *
 * @returns {Object} The component instance.
 */
export function render(element) {
  // TODO: return the DOM node directly, maybe even wrap it in jQuery
  return ReactDOM.render(element, _container);
}


/**
 * Unmount the currently mounted component.
 */
export function unmount() {
  // unmountComponentAtNode will return `false` if there was no component
  // mounted at the given node. That can happen when the component was
  // unmounted inside a test i.e. to test cleanup logic.
  ReactDOM.unmountComponentAtNode(_container);
}


/**
 * Unmount the currently mounted component after each test.
 */
afterEach(function() {
  unmount();
});
