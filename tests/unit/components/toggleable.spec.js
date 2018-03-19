import { spy } from 'sinon';
import { describe, it, beforeEach, expect } from '../suite';


/**
 * @param {Function} $render Receive a set of props and render the component.
 *     It should return the component DOM wrapped in jQuery.
 * @param {Function} toggle Toggle the toggleable. Receives the component DOM
 *     node wrapped in a jQuery object.
 */
export default function toggleableTests($render, toggle) {
  describe('toggleable', function() {
    let onToggle;

    function renderToggle(props) {
      return $render({ ...props, onToggle });
    }

    beforeEach(function() {
      onToggle = spy();
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
