import { expect } from 'chai';
import { addTodo } from './common.js';


describe('App', function() {
  describe('footer', function() {
    it('should should not be shown when there are no todos', async function() {
      expect(await browser.isExisting('.footer')).to.be.false;
    });

    beforeEach(async function() {
      await addTodo('buy cheddar');
      await addTodo('buy chorizo');
      await addTodo('buy bacon');

      // webdriverio will only click on the first match.
      await browser.click('.todo .toggle');
    });

    it('should show the number of active todos', async function() {
      expect(await browser.getText('.todo-count')).to.contain('2');
    });

    it('should show the number of completed todos', async function() {
      expect(await browser.elements('.todo')).to.have.length(1);
    });
  });
});
