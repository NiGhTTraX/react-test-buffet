import React from 'react';
import { render } from '../../../helpers/rendering.js';
import App, { AddTodo, List } from './setup.js';


describe('App', function() {
  describe('todos', function() {
    beforeEach(function() {
      render(<App />);

      const addTodo = AddTodo.lastPropsReceived.addTodo;

      addTodo({ title: 'buy milk' });
      addTodo({ title: 'buy eggs' });
    });

    it('should mark a todo as completed when being called', function() {
      List.lastPropsReceived.onSelect({ index: 0 });

      expect(List).to.have.been.renderedWith({
        items: [{
          title: 'buy milk',
          completed: true
        }, {
          title: 'buy eggs',
          completed: false
        }]
      });
    });

    it('should mark a todo as active when being called', function() {
      List.lastPropsReceived.onSelect({ index: 0 });
      List.lastPropsReceived.onSelect({ index: 0 });

      expect(List).to.have.been.renderedWith({
        items: [{
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
