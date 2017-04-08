import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


// TODO: fix completed strikethrough styles

export default class Todo extends Component {
  static propTypes = {
    Toggle: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired
  };

  render() {
    const { Toggle, id, completed, title, onSelect } = this.props;

    return <div className={classnames('todo', { completed })}>
      <div className="view">
        <Toggle id={`todo-${id}`}
          checked={completed}
          onToggle={onSelect}
        />
        <label htmlFor={`todo-${id}`}>{title}</label>
      </div>
    </div>;
  }
}
