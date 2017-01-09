import ReactDOM from 'react-dom';
import { spy } from 'sinon';
import $ from 'jquery';


/**
 * @param {Function} render Receive a set of props and render the component.
 *     It should return the component instance.
 * @param {Function} toggle Toggle the toggleable. Receives the component DOM
 *     node wrapped in a jQuery object.
 */
export default function toggleableTests(render, toggle) {
  describe('toggleable', function() {
    let onToggle;

    function renderToggle(props) {
      const component = render({ ...props, onToggle });

      return $(ReactDOM.findDOMNode(component));
    }

    beforeEach(function() {
      onToggle = spy();
    });

    it('should apply the given class name', function() {
      const $component = renderToggle({ className: 'test-class' });

      expect($component.hasClass('test-class')).to.be.true;
    });

    it('should call back when unchecking', function() {
      const $component = renderToggle({ checked: true });

      toggle($component);

      expect(onToggle).to.have.been.calledWith({ checked: false });
    });

    it('should call back when checking', function() {
      const $component = renderToggle({ checked: false });

      toggle($component);

      expect(onToggle).to.have.been.calledWith({ checked: true });
    });
  });
}
