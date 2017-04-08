import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class App extends Component {
  static propTypes = {
    AddTodo: PropTypes.func.isRequired,
    List: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      id: 0
    };
  }

  render() {
    const { AddTodo } = this.props;

    return <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <AddTodo addTodo={this.onNewTodo.bind(this)} />
      </header>
      {this.state.todos.length ? this._renderTodos() : null}
    </div>;
  }

  _renderTodos() {
    const { List } = this.props;

    return <section className="main">
      <List items={this.state.todos}
        onSelect={this.onToggleTodo.bind(this)}
      />
    </section>;
  }

  onNewTodo({ title }) {
    // TODO: figure out if this detail needs to go in AddTodo
    if (!title.length) {
      return;
    }

    this.setState({
      todos: this.state.todos.concat({
        id: this.state.id,
        title: title.trim(),
        completed: false
      }),
      id: this.state.id + 1
    });
  }

  onToggleTodo({ id }) {
    const index = this.state.todos.findIndex(todo => todo.id === id);
    const newTodos = this.state.todos.slice();

    newTodos[index] = Object.assign({}, newTodos[index], {
      completed: !newTodos[index].completed
    });

    this.setState({
      todos: newTodos
    });
  }
}
