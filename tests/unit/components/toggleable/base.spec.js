import ReactDOM from 'react-dom';
import { spy } from 'sinon';
import $ from 'jquery';


/**
 * @param {Function} render Accept a set of props and render the component. It
 *     should return the component instance.
 * @param {Function} toggle Toggle the toggleable. Receives the component DOM
 *     node wrapped in a jQuery object.
 */
export default function toggleableTests(render, toggle) {
  describe('toggleable', function() {
    let $component, onToggle;

    beforeEach(function() {
      onToggle = spy();

      const component = render({ className: 'test-class', onToggle });

      $component = $(ReactDOM.findDOMNode(component));
    });

    it('should apply the given class name', function() {
      expect($component.hasClass('test-class')).to.be.true;
    });

    describe('checked', function() {
      beforeEach(function() {
        const component = render({ onToggle, checked: true });

        $component = $(ReactDOM.findDOMNode(component));
      });

      it('should call back when unchecking', function() {
        toggle($component);

        expect(onToggle).to.have.been.calledWith({ checked: false });
      });
    });

    describe('unchecked', function() {
      beforeEach(function() {
        const component = render({ onToggle, checked: false });

        $component = $(ReactDOM.findDOMNode(component));
      });

      it('should call back when checking', function() {
        toggle($component);

        expect(onToggle).to.have.been.calledWith({ checked: true });
      });
    });
  });
}
