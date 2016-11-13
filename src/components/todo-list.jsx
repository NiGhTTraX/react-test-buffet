import React, { Component, PropTypes } from 'react';


export default class TodoList extends Component {
  static propTypes = {
    Todo: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired
    })).isRequired,
    toggleTodo: PropTypes.func.isRequired
  };

  render() {
    const { Todo } = this.props;

    return <ul className="todo-list">
      {this.props.todos.map((todo, index) =>
        <li key={index}>
          <Todo {...todo}
            toggleTodo={this.onToggleTodo.bind(this, index)}
          />
        </li>
      )}
    </ul>;
  }

  onToggleTodo(index) {
    this.props.toggleTodo({ index });
  }
}
