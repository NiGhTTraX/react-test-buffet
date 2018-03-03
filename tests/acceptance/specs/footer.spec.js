import { expect } from 'chai';
import { acceptanceSuite } from '../suite.js';
import { addTodo } from './common.js';


acceptanceSuite('App', function() {
  acceptanceSuite('footer', function() {
    it('should not be shown when there are no todos', async function() {
      expect(await this.browser.isExisting('.footer')).to.be.false;
    });

    acceptanceSuite('with todos', function() {
      beforeEach(async function() {
        await addTodo('buy cheddar', this.browser);
        await addTodo('buy chorizo', this.browser);
        await addTodo('buy bacon', this.browser);

        // webdriverio will only click on the first match.
        await this.browser.click('.todo .toggle');
      });

      it('should show the number of active todos', async function() {
        expect(await this.browser.getText('.todo-count')).to.contain('2');
      });

      it('should filter the completed todos', async function() {
        await this.browser.click('=Completed');

        expect((await this.browser.elements('.todo')).value).to.have.length(1);
      });

      it('should filter the active todos', async function() {
        await this.browser.click('=Active');

        expect((await this.browser.getText('.todo'))).to.deep.equal([
          'buy chorizo',
          'buy bacon'
        ]);
      });
    });
  });
});
