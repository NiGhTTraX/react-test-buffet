import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import App from '../../src/app-factory.js';


export default function setup() {
  const component = ReactDOM.render(<App />,
                                    document.getElementById('test-area'));

  // TODO: use ref functions
  const $component = $(ReactDOM.findDOMNode(component));

  return $component;
}

afterEach(function() {
  ReactDOM.unmountComponentAtNode(document.getElementById('test-area'));
});
