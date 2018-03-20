import $ from 'jquery';
import ReactDOM from 'react-dom';
import {
  runnerAfterEach,
  runnerBeforeEach,
  runnerDescribe,
  runnerIt
} from '../mocha-runner';
import expect from './helpers/expect';

let componentContainer;

/**
 * @param {String} name
 * @param {() => void} definition
 */
export function describe(name, definition) {
  runnerDescribe(name, () => {
    beforeEach(() => {
      componentContainer = document.createElement('div');
    });

    definition();

    afterEach(unmount);
  });
}

/**
 * @param {String} name
 * @param {() => Promise|void} definition
 */
export function it(name, definition) {
  runnerIt(name, definition);
}

/**
 * @param {() => Promise|void} definition
 */
export function beforeEach(definition) {
  runnerBeforeEach(definition);
}

/**
 * @param {() => Promise|void} definition
 */
export function afterEach(definition) {
  runnerAfterEach(definition);
}

export { expect };

/**
 * Render the given component in a freshly created detached DOM container.
 *
 * @param {ReactElement} element
 *
 * @returns {jQuery} The component's root DOM node wrapped in jQuery.
 */
export function $render(element) {
  ReactDOM.render(element, componentContainer);

  // Return the first (and only) child in the container wrapped in jQuery.
  return $(componentContainer).children().eq(0);
}

/**
 * Unmount the currently mounted component.
 */
export function unmount() {
  // unmountComponentAtNode will return `false` if there was no component
  // mounted at the given node. That can happen when the component was
  // unmounted inside a test i.e. to test cleanup logic.
  ReactDOM.unmountComponentAtNode(componentContainer);
}
