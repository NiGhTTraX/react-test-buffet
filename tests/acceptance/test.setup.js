import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.setup.js';
import $ from 'jquery';


export default function setup() {
  const component = ReactDOM.render(<App />,
                                    document.getElementById('test-area'));

  const $component = $(ReactDOM.findDOMNode(component));

  return $component;
}
