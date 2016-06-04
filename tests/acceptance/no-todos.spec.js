import setup from './test.setup.js';


describe('App', function() {
  let $component;

  beforeEach(function() {
    $component = setup();
  });

  describe('with no todos', function() {
    it('should hide the main section', function() {
      expect($component.find('.main')).to.have.length(0);
    });

    it('should hide the footer', function() {
      expect($component.find('.footer')).to.have.length(0);
    });
  });
});
