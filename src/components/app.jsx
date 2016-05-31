import React, { Component } from 'react';


export default function appFactory() {
  return class App extends Component {
    constructor(props) {
      super(props);

      this.state = {
        todoInput: ''
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
          />
        </header>
      </div>;
    }

    onTodoInputChange(e) {
      this.setState({
        todoInput: e.target.value
      });
    }
  };
}
