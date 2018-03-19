import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import { spy } from 'sinon';
import $ from 'jquery';
import { $render } from '../helpers/rendering.js';
import AddTodo from '../../../src/components/add-todo.jsx';
import { describe, it, beforeEach, expect } from '../suite';


const ENTER = 13;


describe('AddTodo', function() {
  let $component, addTodoSpy;

  beforeEach(function() {
    addTodoSpy = spy();

    $component = $render(<AddTodo addTodo={addTodoSpy} />);
  });

  it('should update the new todo input field when typing', function() {
    const node = $component[0];

    Simulate.change(node, { target: { value: 'buy milk' } });

    expect($(node).val()).to.equal('buy milk');
  });

  it('should call with the todo when pressing the enter key', function() {
    const node = $component[0];

    Simulate.change(node, { target: { value: 'buy eggs' } });
    Simulate.keyDown(node, {
      keyCode: ENTER
    });

    expect(addTodoSpy).to.have.been.calledWith({ title: 'buy eggs' });
  });

  it('should not call when pressing another key', function() {
    const node = $component[0];

    Simulate.change(node, { target: { value: 'buy eggs' } });
    Simulate.keyDown(node, {
      keyCode: ENTER + 1
    });

    expect(addTodoSpy).to.not.have.been.called;
  });

  it('should clear the input after adding a todo', function() {
    const node = $component[0];

    Simulate.change(node, { target: { value: 'buy eggs' } });
    Simulate.keyDown(node, {
      keyCode: ENTER
    });

    expect($component.val()).to.be.empty;
  });
});
