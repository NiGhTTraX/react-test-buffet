import React from 'react';
import ReactDOM from 'react-dom';
import { Simulate } from 'react-addons-test-utils';
import { render } from '../../../helpers/rendering.js';
import $ from 'jquery';
import appFactory from '../../../../src/components/app.jsx';

const App = appFactory();


describe('App', function() {
  describe('adding new todos', function() {
    let $component;

    beforeEach(function() {
      const component = render(<App />);

      $component = $(ReactDOM.findDOMNode(component));
    });

    it('should update the new todo input field when typing', function() {
      const node = $component.find('.new-todo')[0];

      Simulate.change(node, { target: { value: 'buy milk' } });

      expect($(node).val()).to.equal('buy milk');
    });
  });
});

