import React from 'react';
import { render } from '../../../helpers/rendering.js';
import App, { AddTodo, TodoList } from './setup.js';
import { match } from 'sinon';


describe('App', function() {
  describe('adding new todos', function() {
    beforeEach(function() {
      render(<App />);
    });

    it('should render the add new todo field', function() {
      expect(AddTodo).to.have.been.rendered;
    });

    it('should render the new todo', function() {
      AddTodo.lastPropsReceived.addTodo({ title: 'buy milk' });

      expect(TodoList).to.have.been.renderedWith({
        todos: [checkTodoTitle('buy milk')]
      });
    });

    it('should mark the new todo as active', function() {
      AddTodo.lastPropsReceived.addTodo({ title: 'buy more milk' });

      expect(TodoList).to.have.been.renderedWith({
        todos: [match({ completed: false })]
      });
    });

    it('should trim whitespace from new todos', function() {
      AddTodo.lastPropsReceived.addTodo({ title: '   wash car   ' });

      expect(TodoList).to.have.been.renderedWith({
        todos: [checkTodoTitle('wash car')]
      });
    });

    it('should not add an empty todo', function() {
      AddTodo.lastPropsReceived.addTodo({ title: '' });

      expect(TodoList).to.not.have.been.renderedWith({
        todos: [checkTodoTitle('')]
      });
    });
  });
});

function checkTodoTitle(title) {
  return match(todo => todo.title === title, title);
}
