import React, { Component } from 'react';


export default function appFactory() {
  return class App extends Component {
    render() {
      return <div className="todo-app">
        <input type="text" className="new-todo" autoFocus
          placeholder="What needs to be done?"
        />
      </div>;
    }
  };
}
