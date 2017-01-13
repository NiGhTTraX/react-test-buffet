import { expect } from 'chai';
import { addTodo } from './common.js';


describe('App', function() {
  beforeEach(function() {
    // TODO: refactor this using something like async.series
    return addTodo(browser, 'buy cheddar')
      .then(() => addTodo(browser, 'buy chorizo'))
      .then(() => addTodo(browser, 'buy bacon'));
  });

  describe('todos', function() {
    it('should not be marked as completed after being added', function() {
      return browser.getAttribute('.todo .toggle', 'checked')
        .then(states => {
          expect(states).to.have.length(3);

          expect(states.every(state => state === 'true')).to.be.false;
        });
    });

    it('should be marked as completed when checking them', function() {
      return browser.element('.todo=buy chorizo')
        .element('.toggle').click()
        .then(() => browser.element('.todo=buy chorizo')
              .element('.toggle').getAttribute('checked'))
        .then(completed => { expect(completed).to.equal('true'); });
    });
  });
});
