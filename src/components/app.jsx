import React, { Component } from 'react';


export default function appFactory(AddTodo, TodoList) {
  return class App extends Component {
    constructor(props) {
      super(props);

      this.state = {
        todos: []
      };
    }

    render() {
      return <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <AddTodo addTodo={this.onNewTodo.bind(this)} />
        </header>
        {this.state.todos.length ? this._renderTodos() : null}
      </div>;
    }

    _renderTodos() {
      return <section className="main">
        <TodoList todos={this.state.todos} />
      </section>;
    }

    onNewTodo(title) {
      // TODO: figure out if this detail needs to go in AddTodo
      if (!title.length) {
        return;
      }

      this.setState({
        todos: this.state.todos.concat({ title: title.trim() })
      });
    }
  };
}
