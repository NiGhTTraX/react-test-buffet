import { expect } from 'chai';
import { addTodo } from './common.js';


describe('App', function() {
  describe('adding new todos', function() {
    it('should focus on the new todo input when the page loads', async function() {
      const className = await browser.elementActive().getAttribute('class');

      expect(className).to.contain('new-todo');
    });

    it('should add a new todo when pressing enter', async function() {
      await addTodo('buy milk');

      expect(await browser.element('.todo').getText()).to.equal('buy milk');
    });

    it('should trim whitespace from new todos', async function() {
      await addTodo('   buy milk    ');

      expect(await browser.element('.todo').getText()).to.equal('buy milk');
    });

    it('should clear the add todo input after adding a todo', async function() {
      await addTodo('buy eggs');

      expect(await browser.element('.new-todo').getValue()).to.be.empty;
    });

    it('should not add an empty todo', async function() {
      await addTodo('');

      expect(await browser.isExisting('.todo')).to.be.false;
    });
  });
});
