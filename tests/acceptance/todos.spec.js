import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import App from './app.setup.js';


describe('App', function() {
  describe('adding new todos', function() {
    let $component;

    beforeEach(function() {
      const component = ReactDOM.render(<App />,
                                        document.getElementById('test-area'));

      $component = $(ReactDOM.findDOMNode(component));
    });

    it('should focus on the todo input', function() {
      expect(document.activeElement).to.equal(
        $component.find('.new-todo')[0]);
    });
  });
});
