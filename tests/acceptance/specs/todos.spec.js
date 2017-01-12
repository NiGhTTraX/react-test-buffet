import { expect } from 'chai';
import { addTodo } from './common.js';


describe('App', function() {
  beforeEach(function() {
    // TODO: refactor this using something like async.series
    return addTodo(this.client, 'buy cheddar')
      .then(() => addTodo(this.client, 'buy chorizo'))
      .then(() => addTodo(this.client, 'buy bacon'));
  });

  describe('todos', function() {
    it('should not be marked as completed after being added', function() {
      return this.client.getAttribute('.todo .toggle', 'checked')
        .then(states => {
          expect(states).to.have.length(3);

          expect(states.every(state => state === true)).to.be.false;
        });
    });

    it('should be marked as completed when checking them', function() {
      return this.client.element('.todo=buy chorizo')
        .element('.toggle').click()
        .then(() => this.client.element('.todo=buy chorizo')
              .element('.toggle').getAttribute('checked'))
        .then(completed => { expect(completed).to.equal('true'); });
    });
  });
});
