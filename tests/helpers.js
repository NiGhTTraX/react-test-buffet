import React from 'react/addons';
import _ from 'lodash';
import ComponentTree from 'react-component-tree';


let _container;

// If there's a container on the page named #test-area, use that, otherwise
// create a detached div and use that. The former case is useful when running
// the tests in your own browser so you can debug how the component is
// rendered.
const testArea = document.querySelector('#test-area');

if (testArea) {
  _container = testArea;
} else {
  _container = document.createElement('div');
}


/**
 * Render a component into the DOM.
 *
 * @param {React class} Component
 * @param {Object} fixture
 *
 * @returns {React instance}
 */
export function render(Component, fixture = {}) {
  const props = _.omit(fixture, 'state', 'children');

  let component;

  try {
    component = React.render(React.createElement(
        Component, props, fixture.children),
        _container);
  } catch (e) {
    throw new Error(
      `The component threw an exception while rendering:\n ${e.message}`);
  }

  if (fixture.state) {
    // Injecting state will trigger a new render cycle and we only care about
    // the calls caused by the last render
    sandbox.reset();

    ComponentTree.injectState(component, fixture.state);
  }

  return component;
}


/**
 * Unmount the currently rendered component.
 */
export function unmount() {
  React.unmountComponentAtNode(_container);
}


/**
 * Stub a method on a React class.
 *
 * @param {React} _class
 * @param {String} method The name of the method you want to stub.
 * @param {*} [resp] The response the stub should return. If not provided, the
 *    stub will return `undefined`.
 *
 * @returns {Stub}
 */
export function stubMethod(_class, method, resp) {
  const methodLoc = _getMethodLocation(_class, method);

  if (_.isFunction(resp)) {
    return sandbox.stub(methodLoc, method, resp);
  }

  return sandbox.stub(methodLoc, method).returns(resp);
}


/**
 * Get the props that will be sent to a child.
 *
 * @param {React} component Component instance.
 * @param {String} name Name of the method that's in the `children` key.
 * @param {Object[]} [args=[]] Arguments that will be passed to the method.
 *
 * @returns {Object} The props.
 */
export function getChildProps(component, name, args = []) {
  const children = component.children;

  if (children === undefined) {
    throw new Error('Component doesn\'t have children');
  }

  const method = children[name];

  if (method === undefined) {
    throw new Error(`Component doesn't have child '${name}'`);
  }

  return method.apply(component, args);
}


/**
 * Get the prototype of a React class.
 *
 * @param {React} _class
 *
 * @return {prototype}
 */
function _getClassPrototyppe(_class) {
  try {
    return _class.prototype;
  } catch (e) {
    throw new Error('Couldn\'t get the component\'s prototype');
  }
}


/**
 * Get the object of which a method is part of.
 *
 * @param {React} _class
 * @param {String} method
 *
 * @returns {Object}
 */
function _getMethodLocation(_class, method) {
  const proto = _getClassPrototyppe(_class);

  // React.createClass automagically binds event handlers and stores a cache of
  // them..ES6 classes don't autobind methods so this cache doesn't even exist.
  if (proto.__reactAutoBindMap && proto.__reactAutoBindMap[method]) {
    return proto.__reactAutoBindMap;
  }

  // Static methods sit here.
  if (proto.constructor[method]) {
    return proto.constructor;
  }

  // All the other methods sit here.
  if (proto[method]) {
    return proto;
  }

  throw new Error(`Could not find method '${method}' on the class prototype`);
}
