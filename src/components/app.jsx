import React, { Component } from 'react';


export default function appFactory() {
  return class App extends Component {
    render() {
      return <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input type="text" className="new-todo" autoFocus
            placeholder="What needs to be done?"
          />
        </header>
        <div className="main">
        </div>
        <footer className="footer">
        </footer>
      </div>;
    }
  };
}
