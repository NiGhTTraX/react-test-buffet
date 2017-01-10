import React, { Component } from 'react';
import sinon from 'sinon';


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

    this.assert(ComponentClass.renderSpy.called,
                constructMessage({ not: false }),
                constructMessage({ not: true }));
  });


  /**
   * @param {Object} props
   *
   * @example
   * expect(ComponentClass).to.have.been.renderedWith({foo: 'bar'});
   */
  Assertion.addMethod('renderedWith', function expectComponentRenderedWith(
    props) {
    const ComponentClass = this._obj;

    const renderSpy = ComponentClass.renderSpy;

    function constructMessage({ not }) {
      let msg = `Expected component '${ComponentClass.displayName}' ` +
                `to ${not ? 'not ' : ''}have been rendered with ` +
                `${renderSpy.printf('%*', props)}`;

      if (renderSpy.called) {
        const renders = renderSpy.args.map(render =>
          // Each render is an array with a single element, the props.
          renderSpy.printf('%*', render[0])).join('\n');

        msg += `\n\nThe component has so far been rendered with:\n${renders}`;
      }

      return msg;
    }

    this.assert(renderSpy.calledWithMatch(props),
                constructMessage({ not: false }),
                constructMessage({ not: true }));
  });
};


export function createSpy({ name } = { name: 'Spy' }) {
  const _renderSpy = sinon.spy();

  return class Spy extends Component {
    static displayName = name;

    static renderSpy = _renderSpy;

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

    static reset() {
      _renderSpy.reset();
    }

    render() {
      _renderSpy(this.props);

      return <div>I am a fake component, here to spy on you!</div>;
    }
  };
}
