import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import appFactory from '../../src/components/app.jsx';


const App = appFactory();


describe('App', function() {
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
