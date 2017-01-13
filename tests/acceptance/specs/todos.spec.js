import { expect } from 'chai';
import { addTodo } from './common.js';


describe('App', function() {
  beforeEach(function() {
    addTodo('buy cheddar');
    addTodo('buy chorizo');
    addTodo('buy bacon');
  });

  describe('todos', function() {
    it('should not be marked as completed after being added', function() {
      // We can use getAttribute without map after
      // https://github.com/webdriverio/wdio-sync/issues/43 is fixed.
      const states = $$('.todo .toggle').map(c => c.getAttribute('checked'));

      expect(states).to.have.length(3);

      expect(states.every(state => state === 'true')).to.be.false;
    });

    it('should be marked as completed when checking them', function() {
      browser.element('.todo=buy chorizo').click('.toggle');

      expect(browser.element('.todo=buy chorizo').element('.toggle')
        .getAttribute('checked')).to.equal('true');
    });
  });
});
