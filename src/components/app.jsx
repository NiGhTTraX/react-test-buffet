import React, { Component } from 'react';
import PropTypes from 'prop-types';


const ALL_FILTER = {
  id: 'all',
  filter: () => true
};

export default class App extends Component {
  static propTypes = {
    AddTodo: PropTypes.func.isRequired,
    List: PropTypes.func.isRequired,
    Select: PropTypes.func.isRequired,
    filters: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      filter: PropTypes.func.isRequired
    })).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      id: 0,
      activeFilter: ALL_FILTER
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
      {this.state.todos.length ? this._renderFooter() : null}
    </div>;
  }

  _renderTodos() {
    const { List } = this.props;
    const filteredTodos = this.state.todos.filter(
      this.state.activeFilter.filter
    );

    return <section className="main">
      <List items={filteredTodos}
        onSelect={this.onToggleTodo.bind(this)}
      />
    </section>;
  }

  _renderFooter() {
    const isActive = todo => !todo.completed;

    const { Select, filters } = this.props;
    const allFilters = [ALL_FILTER].concat(filters).map(
      filter => Object.assign({}, filter, {
        selected: filter.id === this.state.activeFilter.id
      })
    );

    return <footer className="footer">
      <span className="todo-count">
        {this.state.todos.filter(isActive).length} items left
      </span>
      <Select items={allFilters} onSelect={this.onFilterTodos.bind(this)} />
    </footer>;
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

  onFilterTodos({ id }) {
    const { filters } = this.props;

    const allFilters = [ALL_FILTER].concat(filters);

    this.setState({
      activeFilter: allFilters.find(filter => filter.id === id)
    });
  }
}
