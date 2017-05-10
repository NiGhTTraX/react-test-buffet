import React from 'react';
import Toggleable from './toggleable.jsx';
import './checkbox.less';


export default class Checkbox extends Toggleable {
  _render() {
    const { checked } = this.props;

    return <input className="checkbox" type="checkbox"
      checked={checked} onChange={this.onToggle}
    />;
  }
}
