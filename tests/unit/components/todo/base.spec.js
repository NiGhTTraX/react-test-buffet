import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '../../../helpers/rendering.js';
import { Simulate } from 'react-addons-test-utils';
import { spy } from 'sinon';
import $ from 'jquery';
import Todo from '../../../../src/components/todo.jsx';


describe('Todo', function() {
  let $component, toggleTodoSpy;

  beforeEach(function() {
    toggleTodoSpy = spy();
  });

  describe('active', function() {
    const todo = {
      title: 'buy milk',
      completed: false
    };

    beforeEach(function() {
      const component = render(<Todo {...todo} toggleTodo={toggleTodoSpy} />);

      $component = $(ReactDOM.findDOMNode(component));
    });

    it('should not mark active todos', function() {
      expect($component.hasClass('completed'),
            'Todo should not be marked as completed').to.be.false;
      expect($component.find('.toggle').is(':checked'),
            'Todo should not be checked').to.be.false;
    });

    it('should call to toggle a todo when toggling it', function() {
      Simulate.change($component.find('.toggle')[0]);

      expect(toggleTodoSpy).to.have.been.calledOnce;
    });
  });

  describe('completed', function() {
    const todo = {
      title: 'buy eggs',
      completed: true
    };

    beforeEach(function() {
      const component = render(<Todo {...todo} toggleTodo={toggleTodoSpy} />);

      $component = $(ReactDOM.findDOMNode(component));
    });

    it('should mark a completed todo', function() {
      expect($component.hasClass('completed'),
            'Todo should be marked as completed').to.be.true;
      expect($component.find('.toggle').is(':checked'),
            'Todo should be checked').to.be.true;
    });
  });
});
