import { expect } from 'chai';
import { acceptanceSuite } from '../suite.js';
import { addTodo } from './common.js';


acceptanceSuite('App', function() {
  acceptanceSuite('adding new todos', function() {
    it('should focus on the new todo input when the page loads', async function() {
      const className = await browser.elementActive().getAttribute('class');

      expect(className).to.contain('new-todo');
    });

    it('should add a new todo when pressing enter', async function() {
      await addTodo('buy milk');

      expect(await browser.element('.todo').getText()).to.equal('buy milk');
    });
  });
});
