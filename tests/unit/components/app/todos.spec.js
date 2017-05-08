import React from 'react';
import { render } from '../../helpers/rendering.js';
import App, { AddTodo, TodoList } from './setup.js';


describe('App', function() {
  describe('todos', function() {
    beforeEach(function() {
      render(<App />);

      const addTodo = AddTodo.lastProps.addTodo;

      addTodo({ title: 'buy milk' });
      addTodo({ title: 'buy eggs' });
    });

    it('should mark a todo as completed when being called', function() {
      TodoList.lastProps.onSelect({ id: 0 });

      expect(TodoList).to.have.been.renderedWith({
        items: [{
          id: 0,
          title: 'buy milk',
          completed: true
        }, {
          id: 1,
          title: 'buy eggs',
          completed: false
        }]
      });
    });

    it('should mark a todo as active when being called', function() {
      TodoList.lastProps.onSelect({ id: 0 });
      TodoList.lastProps.onSelect({ id: 0 });

      expect(TodoList).to.have.been.renderedWith({
        items: [{
          id: 0,
          title: 'buy milk',
          completed: false
        }, {
          id: 1,
          title: 'buy eggs',
          completed: false
        }]
      });
    });
  });
});
