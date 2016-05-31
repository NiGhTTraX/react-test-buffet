import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import App from './app.setup.js';


describe('App', function() {
  describe('with no todos', function() {
    let $component;

    beforeEach(function() {
      const component = ReactDOM.render(<App />,
                                        document.getElementById('test-area'));

      $component = $(ReactDOM.findDOMNode(component));
    });

    it('should hide the main section', function() {
      expect($component.find('.main')).to.have.length(0);
    });

    it('should hide the footer', function() {
      expect($component.find('.footer')).to.have.length(0);
    });
  });
});
