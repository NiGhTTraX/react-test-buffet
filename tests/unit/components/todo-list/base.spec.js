import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '../../../helpers/rendering.js';
import { Simulate } from 'react-addons-test-utils';
import { spy } from 'sinon';
import $ from 'jquery';
import todoListFactoy from '../../../../src/components/todo-list.jsx';

const TodoList = todoListFactoy();


describe('TodoList', function() {
  const todos = [{
    title: 'buy milk'
  }, {
    title: 'buy eggs',
    completed: true
  }];

  let $component, toggleTodoSpy;

  beforeEach(function() {
    toggleTodoSpy = spy();

    const component = render(
      <TodoList todos={todos} toggleTodo={toggleTodoSpy} />
    );

    $component = $(ReactDOM.findDOMNode(component));
  });

  it('should render every todo', function() {
    const $todos = $component.find('.todo');

    expect($todos).to.have.length(2);

    $todos.each((index, todo) => {
      expect($(todo).text()).to.equal(todos[index].title);
    });
  });

  it('should not mark active todos', function() {
    const $buyMilkTodo = $component.find('.todo').eq(0);

    expect($buyMilkTodo.hasClass('completed'),
          'Todo should not be marked as completed').to.be.false;
    expect($buyMilkTodo.find('.toggle').is(':checked'),
          'Todo should not be checked').to.be.false;
  });

  it('should mark completed todos', function() {
    const $buyEggsTodo = $component.find('.todo').eq(1);

    expect($buyEggsTodo.hasClass('completed'),
          'Todo should be marked as completed').to.be.true;
    expect($buyEggsTodo.find('.toggle').is(':checked'),
          'Todo should be checked').to.be.true;
  });

  it('should complete a todo when toggling it', function() {
    const $buyMilkTodo = $component.find('.todo').eq(0);

    Simulate.change($buyMilkTodo.find('.toggle')[0]);

    expect(toggleTodoSpy).to.have.been.calledWith({ index: 0 });
  });
});
