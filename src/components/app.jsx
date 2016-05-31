import React, { Component } from 'react';

const ENTER = 13;


export default function appFactory() {
  return class App extends Component {
    constructor(props) {
      super(props);

      this.state = {
        todoInput: '',
        todos: []
      };
    }

    render() {
      return <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input type="text" className="new-todo" autoFocus
            value={this.state.todoInput}
            placeholder="What needs to be done?"
            onChange={this.onTodoInputChange.bind(this)}
            onKeyDown={e => {
              if (e.keyCode === ENTER) {
                this.onNewTodo(e.target.value);
              }
            }}
          />
        </header>
        {this.state.todos.length ? this._renderTodos() : null}
      </div>;
    }

    _renderTodos() {
      return <section className="main">
        <ul className="todo-list">
          {this.state.todos.map((todo, index) =>
            <li className="todo" key={index}>
              <div className="view">
                <label>{todo.title}</label>
              </div>
            </li>
          )}
        </ul>
      </section>;
    }

    onTodoInputChange(e) {
      this.setState({
        todoInput: e.target.value
      });
    }

    onNewTodo(title) {
      this.setState({
        todos: this.state.todos.concat({ title })
      });
    }
  };
}
