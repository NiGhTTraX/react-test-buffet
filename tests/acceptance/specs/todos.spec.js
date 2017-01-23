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
      expect(allTodosChecked()).to.be.false;
    });

    it('should be marked as completed when checking them', function() {
      $$('.todo .toggle').forEach(toggle => toggle.click());

      expect(allTodosChecked()).to.be.true;
    });

    function allTodosChecked() {
      // TODO: we can use getAttribute without map after
      // https://github.com/webdriverio/wdio-sync/issues/43 is fixed.
      const states = $$('.todo .toggle').map(
        toggle => toggle.getAttribute('checked'));

      expect(states).to.have.length(3);

      return states.every(state => state === 'true');
    }
  });
});
