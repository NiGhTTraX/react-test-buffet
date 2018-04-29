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
