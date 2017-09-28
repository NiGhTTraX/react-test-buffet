import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './todo-filter.less';


export default class TodoFilter extends Component {
  static propTypes = {
    selected: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
  };

  static defaultProps = {
    selected: false
  };

  render() {
    const { onSelect, name, selected } = this.props;

    return <button
      className={classnames('todo-filter', { selected })}
      onClick={onSelect}
    >
      {name}
    </button>;
  }
}
