import React from 'react';
import ReactDOM from 'react-dom';
import { Simulate } from 'react-addons-test-utils';
import { render } from '../../../helpers/rendering.js';
import $ from 'jquery';
import AddTodo from '../../../../src/components/add-todo.jsx';
import { spy } from 'sinon';


const ENTER = 13;


describe('AddTodo', function() {
  let $component, addTodoSpy;

  beforeEach(function() {
    addTodoSpy = spy();

    const component = render(<AddTodo addTodo={addTodoSpy} />);

    $component = $(ReactDOM.findDOMNode(component));
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

  it('should clear the input after adding a todo', function() {
    const node = $component[0];

    Simulate.change(node, { target: { value: 'buy eggs' } });
    Simulate.keyDown(node, {
      keyCode: ENTER
    });

    expect($component.val()).to.be.empty;
  });
});
