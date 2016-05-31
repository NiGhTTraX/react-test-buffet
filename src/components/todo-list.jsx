import React, { PropTypes } from 'react';


export default function todoListFactory() {
  function TodoList(props) {
    return <ul className="todo-list">
      {props.todos.map((todo, index) =>
        <li className="todo" key={index}>
          <div className="view">
            <label>{todo.title}</label>
          </div>
        </li>
      )}
    </ul>;
  }

  TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired
    })).isRequired
  };

  return TodoList;
}
