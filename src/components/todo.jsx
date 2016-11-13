import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';


// TODO: fix completed strikethrough styles

export default class Todo extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired
  };

  render() {
    const { completed, title, onSelect } = this.props;

    return <div className={classnames('todo', { completed })}>
      <div className="view">
        <input className="toggle" type="checkbox"
          checked={completed}
          onChange={onSelect}
        />
        <label>{title}</label>
      </div>
    </div>;
  }
}
