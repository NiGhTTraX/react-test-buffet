import React from 'react';
import { render } from '../../../helpers/rendering.js';
import { spy } from 'sinon';
import todoListFactoy from '../../../../src/components/todo-list.jsx';
import { fakeComponentFactory } from '../../../helpers/chai-react.js';

const Todo = fakeComponentFactory({ name: 'Todo' });
const TodoList = todoListFactoy(Todo);


describe('TodoList', function() {
  const todos = [{
    title: 'buy milk',
    completed: false
  }, {
    title: 'buy eggs',
    completed: true
  }, {
    title: 'buy cheddar',
    completed: false
  }];

  let toggleTodoSpy;

  beforeEach(function() {
    Todo.reset();

    toggleTodoSpy = spy();

    render(<TodoList todos={todos} toggleTodo={toggleTodoSpy} />);
  });

  it('should render every todo', function() {
    todos.forEach(todo => {
      expect(Todo).to.have.been.renderedWith(todo);
    });
  });

  it('should toggle the first todo when called from it', function() {
    Todo.renderSpy.firstCall.args[0].toggleTodo();

    expect(toggleTodoSpy).to.have.been.calledWith({ index: 0 });
  });

  it('should toggle the last todo when called from it', function() {
    Todo.renderSpy.lastCall.args[0].toggleTodo();

    expect(toggleTodoSpy).to.have.been.calledWith({ index: 2 });
  });

  it('should toggle a todo from the middle when called from it', function() {
    Todo.renderSpy.secondCall.args[0].toggleTodo();

    expect(toggleTodoSpy).to.have.been.calledWith({ index: 1 });
  });
});
