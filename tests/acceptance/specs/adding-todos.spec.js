import { expect } from 'chai';
import { addTodo } from './common.js';


describe('App', function() {
  describe('adding new todos', function() {
    it('should focus on the new todo input when the page loads', function() {
      return this.client.elementActive().getAttribute('class')
        .then(className => { expect(className).to.contain('new-todo'); });
    });

    it('should add a new todo when pressing enter', function() {
      return addTodo(this.client, 'buy milk')
        .then(() => this.client.element('.todo').getText())
        .then(text => { expect(text).to.equal('buy milk'); });
    });

    it('should trim whitespace from new todos', function() {
      return addTodo(this.client, '   buy milk    ')
        .then(() => this.client.element('.todo').getText())
        .then(text => { expect(text).to.equal('buy milk'); });
    });

    it('should clear the add todo input after adding a todo', function() {
      return addTodo(this.client, 'buy eggs')
        .then(() => this.client.element('.new-todo').getValue())
        .then(placeholder => { expect(placeholder).to.be.empty; });
    });

    it('should not add an empty todo', function() {
      return addTodo(this.client, '')
        .then(() => this.client.elements('.todo'))
        .then(({ value: todos }) => { expect(todos).to.be.empty; });
    });
  });
});
