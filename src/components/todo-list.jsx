import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';


export default function todoListFactory() {
  return class TodoList extends Component {
    static propTypes = {
      todos: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        complete: PropTypes.bool
      })).isRequired
    };

    render() {
      return <ul className="todo-list">
        {this.props.todos.map(({ title, completed }, index) =>
          <li className={classnames('todo', { completed })}
            key={index}
          >
            <div className="view">
              <input className="toggle" type="checkbox"
                checked={completed} readOnly
              />
              <label>{title}</label>
            </div>
          </li>
        )}
      </ul>;
    }
  };
}
