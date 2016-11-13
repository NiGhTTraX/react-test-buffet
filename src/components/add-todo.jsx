import React, { Component, PropTypes } from 'react';

const ENTER = 13;


export default class AddTodo extends Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      todoInput: ''
    };
  }

  render() {
    return <input type="text" className="new-todo" autoFocus
      value={this.state.todoInput}
      placeholder="What needs to be done?"
      onChange={this.onTodoInputChange.bind(this)}
      onKeyDown={e => {
        if (e.keyCode === ENTER) {
          this.onAddTodo(e.target.value);
        }
      }}
    />;
  }

  onTodoInputChange(e) {
    this.setState({
      todoInput: e.target.value
    });
  }

  onAddTodo(todo) {
    this.props.addTodo({ title: todo });

    this.setState({
      todoInput: ''
    });
  }
}
