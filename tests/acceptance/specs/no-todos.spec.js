import { expect } from 'chai';


describe('App', function() {
  describe('with no todos', function() {
    it('should hide the main section', function() {
      return this.client.isExisting('.main').then(is => {
        expect(is).to.be.false;
      });
    });

    it('should hide the footer', function() {
      return this.client.isExisting('.footer').then(is => {
        expect(is).to.be.false;
      });
    });
  });
});
