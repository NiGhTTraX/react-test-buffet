import React from 'react';
import { render } from '../../../helpers/rendering.js';
import App, { AddTodo, TodoList } from './setup.js';


describe('App', function() {
  describe('todos', function() {
    beforeEach(function() {
      render(<App />);

      const addTodo = AddTodo.props.addTodo;

      addTodo({ title: 'buy milk' });
      addTodo({ title: 'buy eggs' });
    });

    it('should mark a todo as completed when being called', function() {
      TodoList.props.toggleTodo({ index: 0 });

      expect(TodoList).to.have.been.renderedWith({
        todos: [{
          title: 'buy milk',
          completed: true
        }, {
          title: 'buy eggs',
          completed: false
        }]
      });
    });

    it('should mark a todo as active when being called', function() {
      TodoList.props.toggleTodo({ index: 0 });
      TodoList.props.toggleTodo({ index: 0 });

      expect(TodoList).to.have.been.renderedWith({
        todos: [{
          title: 'buy milk',
          completed: false
        }, {
          title: 'buy eggs',
          completed: false
        }]
      });
    });
  });
});
