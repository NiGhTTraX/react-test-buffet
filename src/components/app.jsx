import React, { Component } from 'react';
import PropTypes from 'prop-types';


const ALL_FILTER = {
  id: 'all',
  filter: () => true,
  name: 'All' // TODO: this should probably be injected
};

export default class App extends Component {
  static propTypes = {
    AddTodo: PropTypes.func.isRequired,
    TodoList: PropTypes.func.isRequired,
    TodoFilters: PropTypes.func.isRequired,
    filters: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
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
    const { TodoList } = this.props;
    const filteredTodos = this.state.todos.filter(
      this.state.activeFilter.filter
    );

    return <section className="main">
      <TodoList items={filteredTodos}
        onSelect={this.onToggleTodo.bind(this)}
      />
    </section>;
  }

  _renderFooter() {
    const isActive = todo => !todo.completed;

    const { TodoFilters } = this.props;
    const allFilters = this._getAllFilters().map(
      filter => Object.assign({}, filter, {
        selected: filter.id === this.state.activeFilter.id
      })
    );

    return <footer className="footer">
      <span className="todo-count">
        {this.state.todos.filter(isActive).length} items left
      </span>
      <TodoFilters items={allFilters} onSelect={this.onFilterTodos.bind(this)} />
    </footer>;
  }

  onNewTodo({ title }) {
    // TODO: figure out if this detail needs to go in AddTodo
    if (!title.length) {
      return;
    }

    this.setState(prevState => ({
      todos: prevState.todos.concat({
        id: prevState.id,
        title: title.trim(),
        completed: false
      }),
      id: prevState.id + 1
    }));
  }

  onToggleTodo({ id }) {
    this.setState(prevState => {
      const index = prevState.todos.findIndex(todo => todo.id === id);
      const newTodos = prevState.todos.slice();

      newTodos[index] = Object.assign({}, newTodos[index], {
        completed: !newTodos[index].completed
      });

      return {
        todos: newTodos
      };
    });
  }

  onFilterTodos({ id }) {
    const allFilters = this._getAllFilters();

    this.setState({
      activeFilter: allFilters.find(filter => filter.id === id)
    });
  }

  _getAllFilters() {
    return [ALL_FILTER].concat(this.props.filters);
  }
}
