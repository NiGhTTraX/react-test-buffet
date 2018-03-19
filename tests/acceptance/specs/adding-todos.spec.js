import { describe, it, vit, expect } from '../suite.js';
import { addTodo } from './common.js';


describe('App', function() {
  describe('adding new todos', function() {
    it('should focus on the new todo input when the page loads', async function(browser) {
      const className = await browser.elementActive().getAttribute('class');

      expect(className).to.contain('new-todo');
    });

    vit('should add a new todo when pressing enter', async function(browser) {
      await addTodo('buy milk', browser);

      expect(await browser.element('.todo').getText()).to.equal('buy milk');
    });
  });
});
