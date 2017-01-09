import React from 'react';
import Toggleable from './toggleable.jsx';


export default class Checkbox extends Toggleable {
  _render() {
    const { checked } = this.props;

    return <input className="toggle" type="checkbox"
      checked={checked} onChange={this.onToggle}
    />;
  }
}
