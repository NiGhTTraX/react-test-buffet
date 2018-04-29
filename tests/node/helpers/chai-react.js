import { match, stub } from 'sinon';
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
 * @property {(props: Object) => ReactStubExpectation} withProps Use to
 *   customize the expectations of the stub. The given props are partially
 *   matched using `sinon.match`.
 * @property {Object} firstProps The props for the first render.
 * @property {Object} lastProps The props for the last render.
 * @property {Object[]} renders The props for all the renders.
 * @property {Boolean} rendered
 * @property {(Object) => Boolean} renderedWith
 */

/**
 * @typedef {Object extends Sinon.expectation} ReactStubExpectation
 *
 * @property {(jsx: React.JSX.Element|string|null) => void} renders Force the
 *   stub to render the given JSX for the currently matched props (set by
 *   `withProps`)
 */

/**
 * Create a stub component to pass into components that accept render props.
 *
 * @returns {ReactStub} By default the stub renders some bogus content. Use
 *   `withProps` and `renders` to set expectations on it.
 */
export function createReactStub() {
  const reactStub = stub();

  reactStub.returns('::react stub::');

  Object.defineProperties(reactStub, {
    withProps: {
      value: props => {
        const expectation = reactStub.withArgs(match(props));
        expectation.renders = expectation.returns.bind(expectation);
        return expectation;
      }
    },
    renderedWith: {
      value: props => reactStub.calledWithMatch(props)
    },
    rendered: {
      get() {
        return reactStub.called;
      }
    },
    firstProps: {
      get() {
        return reactStub.firstCall.args[0];
      }
    },
    lastProps: {
      get() {
        return reactStub.lastCall.args[0];
      }
    },
    renders: {
      get() {
        return reactStub.args.map(args => args[0]);
      }
    }
  });

  return reactStub;
}
