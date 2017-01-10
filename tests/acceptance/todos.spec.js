import { Simulate } from 'react-addons-test-utils';
import $ from 'jquery';
import setup from './test.setup.js';

const ENTER = 13;


describe('App', function() {
  let $component;

  beforeEach(function() {
    $component = setup();

    addTodo($component, 'buy cheddar');
    addTodo($component, 'buy chorizo');
    addTodo($component, 'buy bacon');
  });

  describe('todos', function() {
    it('should not be marked as completed after being added', function() {
      const $toggles = $component.find('.todo .toggle');

      expect($toggles).to.have.length(3);

      $toggles.each(toggle => {
        expect($(toggle).is(':checked'),
               'Todo toggle should be unchecked').to.be.false;
      });
    });

    it('should be marked as completed when checking them', function() {
      const $buyChorizoTodo = $component.find('.todo').eq(1);

      $buyChorizoTodo.find('.toggle')[0].click();

      expect($buyChorizoTodo.hasClass('completed'),
            'Todo should be marked as completed').to.be.true;
      expect($buyChorizoTodo.find('.toggle').is(':checked'),
            'Todo toggle should be checked').to.be.true;
    });

    it('should be marked as active when unchecking them', function() {
      const $buyChorizoTodo = $component.find('.todo').eq(1);

      $buyChorizoTodo.find('.toggle')[0].click();
      $buyChorizoTodo.find('.toggle')[0].click();

      expect($buyChorizoTodo.hasClass('completed'),
            'Todo should not be marked as completed').to.be.false;
      expect($buyChorizoTodo.find('.toggle').is(':checked'),
            'Todo toggle should not be checked').to.be.false;
    });
  });
});

function addTodo($component, todo) {
  const node = $component.find('.new-todo')[0];

  // TODO: this exposes too much of the internals; figure out a way to write
  // tests without knowing all of this
  Simulate.change(node, { target: { value: todo } });
  Simulate.keyDown(node, {
    keyCode: ENTER
  });
}
