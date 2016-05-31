import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '../../../helpers/rendering.js';
import $ from 'jquery';
import todoListFactoy from '../../../../src/components/todo-list.jsx';

const TodoList = todoListFactoy();


describe('TodoList', function() {
  const todos = [{
    title: 'buy milk'
  }, {
    title: 'buy eggs'
  }];

  let $component;

  beforeEach(function() {
    const component = render(<TodoList todos={todos} />);

    $component = $(ReactDOM.findDOMNode(component));
  });

  it('should render every todo', function() {
    $component.find('.todo').each((todo, index) => {
      expect($(todo).text()).to.equal(todos[index].title);
    });
  });
});
