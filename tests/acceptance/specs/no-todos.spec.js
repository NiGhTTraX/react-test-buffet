import { expect } from 'chai';


describe('App', function() {
  describe('with no todos', function() {
    it('should hide the main section', async function() {
      return expect(await browser.isExisting('.main')).to.be.false;
    });

    it('should hide the footer', async function() {
      return expect(await browser.isExisting('.footer')).to.be.false;
    });
  });
});
