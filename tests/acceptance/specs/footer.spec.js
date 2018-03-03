import { expect } from 'chai';
import { describe, beforeEach, it } from '../suite.js';
import { addTodo } from './common.js';


describe('App', function() {
  describe('footer', function() {
    it('should not be shown when there are no todos', async function(browser) {
      expect(await browser.isExisting('.footer')).to.be.false;
    });

    describe('with todos', function() {
      beforeEach(async function(browser) {
        await addTodo('buy cheddar', browser);
        await addTodo('buy chorizo', browser);
        await addTodo('buy bacon', browser);

        // webdriverio will only click on the first match.
        await browser.click('.todo .toggle');
      });

      it('should show the number of active todos', async function(browser) {
        expect(await browser.getText('.todo-count')).to.contain('2');
      });

      it('should filter the completed todos', async function(browser) {
        await browser.click('=Completed');

        expect((await browser.elements('.todo')).value).to.have.length(1);
      });

      it('should filter the active todos', async function(browser) {
        await browser.click('=Active');

        expect((await browser.getText('.todo'))).to.deep.equal([
          'buy chorizo',
          'buy bacon'
        ]);
      });
    });
  });
});
