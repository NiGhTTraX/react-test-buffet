import { expect } from 'chai';


describe('App', function() {
  describe('with no todos', function() {
    it('should hide the main section', function() {
      return browser.isExisting('.main').then(is => {
        expect(is).to.be.false;
      });
    });

    it('should hide the footer', function() {
      return browser.isExisting('.footer').then(is => {
        expect(is).to.be.false;
      });
    });
  });
});
