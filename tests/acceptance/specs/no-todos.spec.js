import { expect } from 'chai';


describe('App', function() {
  describe('with no todos', function() {
    it('should hide the main section', function() {
      return expect(browser.isExisting('.main')).to.be.false;
    });

    it('should hide the footer', function() {
      return expect(browser.isExisting('.footer')).to.be.false;
    });
  });
});
