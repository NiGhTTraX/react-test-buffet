import React from 'react';
import ReactDOM from 'react-dom';
import { Simulate } from 'react-addons-test-utils';
import Checkbox from '../../../../src/components/checkbox.jsx';
import toggleableTests from '../toggleable/base.spec.js';
import { render } from '../../../helpers/rendering.js';
import $ from 'jquery';


describe('Checkbox', function() {
  toggleableTests(
    props => render(<Checkbox {...props} />),
    $component => Simulate.change($component.find(':checkbox')[0])
  );

  let $checkbox;
  const onToggle = () => { };

  describe('checked', function() {
    beforeEach(function() {
      const component = render(<Checkbox onToggle={onToggle} checked />);

      $checkbox = $(':checkbox', ReactDOM.findDOMNode(component));
    });

    it('should be checked', function() {
      expect($checkbox.is(':checked')).to.be.true;
    });
  });

  describe('unchecked', function() {
    beforeEach(function() {
      const component = render(<Checkbox onToggle={onToggle} />);

      $checkbox = $(':checkbox', ReactDOM.findDOMNode(component));
    });

    it('should be unchecked', function() {
      expect($checkbox.is(':checked')).to.be.false;
    });
  });
});
