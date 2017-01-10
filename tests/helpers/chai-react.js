import React, { Component } from 'react';
import { spy } from 'sinon';
import { inspect } from 'util';


export default chai => {
  const Assertion = chai.Assertion;

  /**
   * @example
   * expect(ComponentClass).to.have.been.rendered;
   */
  Assertion.addProperty('rendered', function expectComponentRendered() {
    const ComponentClass = this._obj;

    function constructMessage({ not }) {
      return `Expected component '${ComponentClass.displayName}' ` +
             `to ${not ? 'not ' : ''}have been rendered`;
    }

    this.assert(ComponentClass.rendered,
                constructMessage({ not: false }),
                constructMessage({ not: true }));
  });


  /**
   * @param {Object} expectedProps
   *
   * @example
   * expect(ComponentClass).to.have.been.renderedWith({foo: 'bar'});
   */
  Assertion.addMethod('renderedWith', function expectComponentRenderedWith(
    expectedProps) {
    const ComponentClass = this._obj;

    function constructMessage({ not }) {
      let msg = `Expected component '${ComponentClass.displayName}' to ${not ? 'not ' : ''}have been rendered with ${inspect(expectedProps, { depth: 0 })}`;

      if (ComponentClass.rendered) {
        const renders = ComponentClass.renders.map(
          // Printing a single level of nesting should be enough for almost
          // everyone (TM).
          props => inspect(props, { depth: 0 })
        ).join('\n');

        msg += `\n\nThe component has so far been rendered with:\n${renders}`;
      }

      return msg;
    }

    this.assert(ComponentClass.renderedWith(expectedProps),
                constructMessage({ not: false }),
                constructMessage({ not: true }));
  });
};


export function createSpy({ name } = { name: 'Spy' }) {
  const _renderSpy = spy();

  return class Spy extends Component {
    static displayName = name;

    /**
     * Get whether the component was rendered at least once.
     *
     * @return {Boolean}
     */
    static get rendered() {
      return _renderSpy.called;
    }

    /**
     * Get the props used in the last render.
     *
     * @return {Object}
     */
    static get lastProps() {
      if (!_renderSpy.called) {
        throw new Error('Component was never rendered');
      }

      return _renderSpy.args[_renderSpy.callCount - 1][0];
    }

    /**
     * Get the props used in every render ever.
     *
     * @returns {Object[]}
     */
    static get renders() {
      if (!_renderSpy.called) {
        throw new Error('Component was never rendered');
      }

      return _renderSpy.args.map(args => args[0]);
    }

    /**
     * Check if the component was rendered at least once with the given props.
     *
     * @param {Object} props Supports sinon matchers. See
     * http://sinonjs.org/docs/#sinon-match-api.
     *
     * @returns {Boolean}
     */
    static renderedWith(props) {
      return _renderSpy.calledWithMatch(props);
    }

    static reset() {
      _renderSpy.reset();
    }

    render() {
      _renderSpy(this.props);

      return <div>I am a fake component, here to spy on you!</div>;
    }
  };
}
