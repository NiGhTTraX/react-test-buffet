import { expect } from 'chai';
import { describe, beforeEach, it, vit } from '../suite.js';
import { addTodo } from './common.js';


describe('App', function() {
  beforeEach(async function(browser) {
    await addTodo('buy cheddar', browser);
    await addTodo('buy chorizo', browser);
    await addTodo('buy bacon', browser);
  });

  describe('todos', function() {
    it('should not be marked as completed after being added', async function(browser) {
      expect(await allTodosChecked(browser)).to.be.false;
    });

    vit('should be marked as completed when checking them', async function(browser) {
      (await browser.elements('.todo .toggle')).value.forEach(
        async toggle => browser.elementIdClick(toggle.ELEMENT)
      );

      expect(await allTodosChecked(browser)).to.be.true;
    });

    async function allTodosChecked(browser) {
      const states = await browser.getAttribute('.todo .toggle', 'checked');

      expect(states).to.have.length(3);

      return states.every(state => state === 'true');
    }
  });
});
