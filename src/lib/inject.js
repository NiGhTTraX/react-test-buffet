import React from 'react';


/**
 * Inject dependencies into a component.
 *
 * @param {Object} deps A set of props that will be passed to the component,
 *     alongside any other props that it will receive from its parent.
 * @param {ReactComponent} Component
 *
 * @returns {ReactComponent}
 */
export default function inject(deps, Component) {
  // We can't return a pure component because the user might want to get its DOM
  // node.
  return class Injector extends React.Component {
    render() {
      return <Component {...deps} {...this.props} />;
    }
  };
}
