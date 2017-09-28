import React from 'react';
import AbstractToggleable from './abstract-toggleable.jsx';
import './checkbox.less';


export default class Checkbox extends AbstractToggleable {
  _render() {
    const { checked } = this.props;

    return <input className="checkbox" type="checkbox"
      checked={checked} onChange={this.onToggle}
    />;
  }
}
