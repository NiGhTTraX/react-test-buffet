import React, { Component, PropTypes } from 'react';


export default class Toggleable extends Component {
  static propTypes = {
    className: PropTypes.string,
    checked: PropTypes.bool,
    onToggle: PropTypes.func.isRequired
  };

  static defaultProps = {
    checked: false
  };

  render() {
    const { className } = this.props;

    return <div className={className}>
      {this._render()}
    </div>;
  }

  onToggle = () => {
    const { onToggle, checked } = this.props;

    onToggle({ checked: !checked });
  }
}
