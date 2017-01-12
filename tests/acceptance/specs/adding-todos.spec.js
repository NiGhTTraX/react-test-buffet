import { expect } from 'chai';
import { addTodo } from './common.js';


describe('App', function() {
  describe('adding new todos', function() {
    it('should focus on the new todo input when the page loads', function() {
      return browser.elementActive().getAttribute('class')
        .then(className => { expect(className).to.contain('new-todo'); });
    });

    it('should add a new todo when pressing enter', function() {
      return addTodo(browser, 'buy milk')
        .then(() => browser.element('.todo').getText())
        .then(text => { expect(text).to.equal('buy milk'); });
    });

    it('should trim whitespace from new todos', function() {
      return addTodo(browser, '   buy milk    ')
        .then(() => browser.element('.todo').getText())
        .then(text => { expect(text).to.equal('buy milk'); });
    });

    it('should clear the add todo input after adding a todo', function() {
      return addTodo(browser, 'buy eggs')
        .then(() => browser.element('.new-todo').getValue())
        .then(placeholder => { expect(placeholder).to.be.empty; });
    });

    it('should not add an empty todo', function() {
      return addTodo(browser, '')
        .then(() => browser.elements('.todo'))
        .then(({ value: todos }) => { expect(todos).to.be.empty; });
    });
  });
});
