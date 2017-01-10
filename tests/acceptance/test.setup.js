import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import App from '../../src/app-factory.js';

const container = document.getElementById('test-area');


export default function setup() {
  ReactDOM.render(<App />, container);

  return $(container).children().eq(0);
}

afterEach(function() {
  ReactDOM.unmountComponentAtNode(document.getElementById('test-area'));
});
