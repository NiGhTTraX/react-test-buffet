import React from 'react';
import { match } from 'sinon';
import App, { AddTodo, TodoList, TodoFilters, filters } from './setup.js';
import { describe, it, beforeEach, expect, $render } from '../../suite';


describe('App', function() {
  describe('footer', function() {
    let $app;

    beforeEach(function() {
      $app = $render(<App />);
    });

    it('should not be rendered when there are no todos', function() {
      expect($app.find('.footer')).to.have.length(0);
    });

    describe('with todos', function() {
      beforeEach(function() {
        AddTodo.lastProps.addTodo({ title: 'buy milk' });
        AddTodo.lastProps.addTodo({ title: 'buy chorizo' });
        AddTodo.lastProps.addTodo({ title: 'buy cheddar' });

        TodoList.lastProps.onSelect({ id: 2 });
      });

      it('should be rendered when there are todos', function() {
        expect($app.find('.footer')).to.have.length(1);
      });

      it('should show the number of active todos', function() {
        expect($app.find('.todo-count').text()).to.contain('2');
      });

      it('should show the todo filters', function() {
        const renderedFilters = TodoFilters.lastProps.items;

        expect(renderedFilters.map(filter => filter.id))
          .to.include.members(['none', 'last_one']);
      });

      it('should contain an extra `off` filter', function() {
        expect(TodoFilters).to.have.been.renderedWith({
          items: match.has('length', filters.length + 1)
        });
      });

      it('should initially select the `off` filter', function() {
        const selectedFilter = TodoFilters.lastProps.items.find(
          filter => filter.selected
        );

        expect(['none', 'last_one']).to.not.include(selectedFilter.id);
      });

      it('should apply the first available filter when it is selected', () => {
        TodoList.reset();

        TodoFilters.lastProps.onSelect({ id: 'none' });

        expect(TodoList).to.have.been.renderedWith({ items: [] });
      });

      it('should apply the last available filter when it is selected', () => {
        TodoList.reset();

        TodoFilters.lastProps.onSelect({ id: 'last_one' });

        expect(TodoList).to.have.been.renderedWith({
          // Checking the ID of the todos is enough.
          items: [match.has('id', 2)]
        });
      });

      it('should turn off filtering when selecting the `off` filter', () => {
        const offFilter = TodoFilters.lastProps.items.find(
          filter => filter.selected
        );

        TodoFilters.lastProps.onSelect({ id: 'last_one' });
        TodoList.reset();
        TodoFilters.lastProps.onSelect({ id: offFilter.id });

        expect(TodoList).to.have.been.renderedWith({
          // Checking the ID of the todos is enough.
          items: [
            match.has('id', 0),
            match.has('id', 1),
            match.has('id', 2)
          ]
        });
      });
    });
  });
});
