import { expect } from 'chai';
import { addTodo } from './common.js';


describe('App', function() {
  describe('adding new todos', function() {
    it('should focus on the new todo input when the page loads', function() {
      expect(browser.elementActive().getAttribute('class'))
        .to.contain('new-todo');
    });

    it('should add a new todo when pressing enter', function() {
      addTodo('buy milk');

      expect(browser.element('.todo').getText()).to.equal('buy milk');
    });

    it('should trim whitespace from new todos', function() {
      addTodo('   buy milk    ');

      expect(browser.element('.todo').getText()).to.equal('buy milk');
    });

    it('should clear the add todo input after adding a todo', function() {
      addTodo('buy eggs');

      expect(browser.element('.new-todo').getValue()).to.be.empty;
    });

    it('should not add an empty todo', function() {
      addTodo('');

      expect(browser.isExisting('.todo')).to.be.false;
    });
  });
});
