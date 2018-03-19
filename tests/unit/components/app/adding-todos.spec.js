import React from 'react';
import { match } from 'sinon';
import { $render } from '../../helpers/rendering.js';
import App, { AddTodo, TodoList } from './setup.js';
import { describe, it, beforeEach, expect } from '../../suite';


describe('App', function() {
  describe('adding new todos', function() {
    beforeEach(function() {
      $render(<App />);
    });

    it('should render the add new todo field', function() {
      expect(AddTodo).to.have.been.rendered;
    });

    it('should render the new todo', function() {
      AddTodo.lastProps.addTodo({ title: 'buy milk' });

      expect(TodoList).to.have.been.renderedWith({
        items: [checkTodoTitle('buy milk')]
      });
    });

    it('should mark the new todo as active', function() {
      AddTodo.lastProps.addTodo({ title: 'buy more milk' });

      expect(TodoList).to.have.been.renderedWith({
        items: [match({ completed: false })]
      });
    });

    it('should trim whitespace from new todos', function() {
      AddTodo.lastProps.addTodo({ title: '   wash car   ' });

      expect(TodoList).to.have.been.renderedWith({
        items: [checkTodoTitle('wash car')]
      });
    });

    it('should not add an empty todo', function() {
      AddTodo.lastProps.addTodo({ title: '' });

      expect(TodoList).to.not.have.been.renderedWith({
        items: [checkTodoTitle('')]
      });
    });
  });
});

function checkTodoTitle(title) {
  return match(todo => todo.title === title, title);
}
