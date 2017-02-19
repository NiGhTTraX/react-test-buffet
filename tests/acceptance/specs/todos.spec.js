import { expect } from 'chai';
import { addTodo } from './common.js';


describe('App', function() {
  beforeEach(async function() {
    await addTodo('buy cheddar');
    await addTodo('buy chorizo');
    await addTodo('buy bacon');
  });

  describe('todos', function() {
    it('should not be marked as completed after being added', async function() {
      expect(await allTodosChecked()).to.be.false;
    });

    it('should be marked as completed when checking them', async function() {
      (await browser.elements('.todo .toggle')).value.forEach(
        async toggle => browser.elementIdClick(toggle.ELEMENT)
      );

      expect(await allTodosChecked()).to.be.true;
    });

    async function allTodosChecked() {
      const states = await browser.getAttribute('.todo .toggle', 'checked');

      expect(states).to.have.length(3);

      return states.every(state => state === 'true');
    }
  });
});
