import { expect } from 'chai';
import { acceptanceSuite } from '../suite.js';
import { addTodo } from './common.js';


acceptanceSuite('App', function() {
  beforeEach(async function() {
    await addTodo('buy cheddar', this.browser);
    await addTodo('buy chorizo', this.browser);
    await addTodo('buy bacon', this.browser);
  });

  acceptanceSuite('todos', function() {
    it('should not be marked as completed after being added', async function() {
      expect(await allTodosChecked(this.browser)).to.be.false;
    });

    it('should be marked as completed when checking them', async function() {
      (await this.browser.elements('.todo .toggle')).value.forEach(
        async toggle => this.browser.elementIdClick(toggle.ELEMENT)
      );

      expect(await allTodosChecked(this.browser)).to.be.true;
    });

    async function allTodosChecked(browser) {
      const states = await browser.getAttribute('.todo .toggle', 'checked');

      expect(states).to.have.length(3);

      return states.every(state => state === 'true');
    }
  });
});
