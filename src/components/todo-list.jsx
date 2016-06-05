import React, { Component, PropTypes } from 'react';


export default function todoListFactory(Todo) {
  return class TodoList extends Component {
    static propTypes = {
      todos: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
      })).isRequired,
      toggleTodo: PropTypes.func.isRequired
    };

    render() {
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
  };
}
