import React from 'react';
import { match } from 'sinon';
import { $render } from '../../helpers/rendering.js';
import App, { AddTodo, List, Select, filters } from './setup.js';


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

        List.lastProps.onSelect({ id: 2 });
      });

      it('should be rendered when there are todos', function() {
        expect($app.find('.footer')).to.have.length(1);
      });

      it('should show the number of active todos', function() {
        expect($app.find('.todo-count').text()).to.contain('2');
      });

      it('should show the todo filters', function() {
        const renderedFilters = Select.lastProps.items;

        expect(renderedFilters.map(filter => filter.id))
          .to.include.members(['none', 'last_one']);
      });

      it('should contain an extra `off` filter', function() {
        expect(Select).to.have.been.renderedWith({
          items: match.has('length', filters.length + 1)
        });
      });

      it('should initially select the `off` filter', function() {
        const selectedFilter = Select.lastProps.items.find(
          filter => filter.selected
        );

        expect(['none', 'last_one']).to.not.include(selectedFilter.id);
      });
    });
  });
});
