import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';


// TODO: fix completed strikethrough styles

export default class Todo extends Component {
  static propTypes = {
    Toggle: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired
  };

  render() {
    const { Toggle, completed, title, onSelect } = this.props;

    return <div className={classnames('todo', { completed })}>
      <div className="view">
        <Toggle
          checked={completed}
          onToggle={onSelect}
        />
        <label>{title}</label>
      </div>
    </div>;
  }
}
