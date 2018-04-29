import React, { Component } from 'react';
import { match, spy, stub } from 'sinon';
import { inspect } from 'util';


export default chai => {
  const { Assertion } = chai;

  /**
   * @example
   * expect(ComponentClass).to.have.been.rendered;
   */
  Assertion.addProperty('rendered', function expectComponentRendered() {
    const ComponentClass = this._obj;

    function constructMessage({ not }) {
      return `Expected component '${ComponentClass.displayName}' to ${not ? 'not ' : ''}have been rendered`;
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
    expectedProps
  ) {
    const ComponentClass = this._obj;

    function constructMessage({ not }) {
      let msg = `Expected component '${ComponentClass.displayName}' to ${not ? 'not ' : ''}have been rendered with ${inspect(expectedProps)}`;

      if (ComponentClass.rendered) {
        const renders = ComponentClass.renders.map(
          props => inspect(props)
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

/**
 * @typedef {Object extends Sinon.stub} ReactStub
 *
 * @property {(props: Object) => ReactStub} withProps Use to customize the
 *   expectations of the stub. The given props are partially matched using
 *   sinon.match.
 * @property {(jsx: React.JSX.Element|string|null) => void} renders Force the
 *   stub to render the given JSX. If previously chained with a `withProps` call
 *   then it will render only for that match.
 */

/**
 * @returns {ReactStub} By default the stub renders some bogus content. Use
 *   `withProps` and `renders` to set expectations on it.
 */
export function createReactStub() {
  const reactStub = stub();

  reactStub.returns('::react stub::');

  reactStub.withProps = props => {
    const expectation = reactStub.withArgs(match(props));
    expectation.renders = expectation.returns.bind(expectation);
    return expectation;
  };

  reactStub.renders = reactStub.returns.bind(reactStub);

  Object.defineProperties(reactStub, {
    rendered: {
      get() {
        return reactStub.called;
      }
    },
    renderedWith: {
      value: props => reactStub.calledWithMatch(props)
    },
    /**
     * Return the first set of received props.
     */
    firstProps: {
      get() {
        return reactStub.firstCall.args[0];
      }
    },
    /**
     * Return the last set of received props.
     */
    lastProps: {
      get() {
        return reactStub.lastCall.args[0];
      }
    },
    /**
     * Return a list of received props from every render.
     */
    renders: {
      get() {
        return reactStub.args.map(args => args[0]);
      }
    }
  });

  return reactStub;
}

/**
 * @param {Object} options
 * @param {String} options.name The display name of the component.
 * @param {ReactClass} [options.Mock] If given, the spy will try to look like
 *     it. Currently it only copies the prop types.
 *     TODO: copy public methods; maybe inherit?
 *
 * @returns {ReactClass}
 */
export function createSpy({ name = 'Spy', Mock = Component } = {}) {
  const _renderSpy = spy();

  return class Spy extends Component {
    static displayName = name;

    static propTypes = Mock.propTypes;

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
      _renderSpy.resetHistory();
    }

    render() {
      _renderSpy(this.props);

      return <div>I am a fake component, here to spy on you!</div>;
    }
  };
}
