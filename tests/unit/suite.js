import $ from 'jquery';
import ReactDOM from 'react-dom';
import {
  runnerAfterEach,
  runnerBeforeEach,
  runnerDescribe,
  runnerIt
} from '../mocha-runner';
import expect from './helpers/expect';

export function describe(name, definition) {
  runnerDescribe(name, () => {
    definition();

    // Unmount the currently mounted component after each test.
    afterEach(function() {
      unmount();
    });
  });
}

export function it(name, definition) {
  runnerIt(name, definition);
}

export function beforeEach(definition) {
  runnerBeforeEach(definition);
}

export function afterEach(definition) {
  runnerAfterEach(definition);
}

export { expect };

const _container = document.createElement('div');

/**
 * Render the given component.
 *
 * @param {ReactElement} element
 *
 * @returns {jQuery} The component's root DOM node wrapped in jQuery.
 */
export function $render(element) {
  ReactDOM.render(element, _container);

  // Return the first (and only) child in the container wrapped in jQuery.
  return $(_container).children().eq(0);
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
