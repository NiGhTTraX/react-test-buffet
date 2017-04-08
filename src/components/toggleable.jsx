import { Component } from 'react';
import PropTypes from 'prop-types';


/**
 * A base component that can be toggled on or off.
 *
 * The derived class should render the actual representation of the component,
 * including the toggle state.
 */
export default class Toggleable extends Component {
  static propTypes = {
    checked: PropTypes.bool,
    onToggle: PropTypes.func.isRequired
  };

  static defaultProps = {
    checked: false
  };

  render() {
    return this._render();
  }

  onToggle = () => {
    const { onToggle, checked } = this.props;

    onToggle({ checked: !checked });
  }
}
