import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { render } from '../../../helpers/rendering.js';
import appFactory from '../../../../src/components/app.jsx';


const App = appFactory();


describe('App', function() {
  let $component;

  beforeEach(function() {
    const component = render(<App />);

    $component = $(ReactDOM.findDOMNode(component));
  });

  it('should have a placeholder for the new todo field', function() {
    expect($component.find('.new-todo').attr('placeholder')).to.not.be.empty;
  });
});
