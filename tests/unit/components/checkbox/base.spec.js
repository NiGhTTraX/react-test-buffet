import React from 'react';
import ReactDOM from 'react-dom';
import { Simulate } from 'react-addons-test-utils';
import $ from 'jquery';
import Checkbox from '../../../../src/components/checkbox.jsx';
import toggleableTests from '../toggleable/base.spec.js';
import { render } from '../../../helpers/rendering.js';


describe('Checkbox', function() {
  toggleableTests(
    props => render(<Checkbox {...props} />),
    $component => Simulate.change($component.find(':checkbox')[0])
  );

  function renderCheckbox(props) {
    const component = render(<Checkbox onToggle={() => { }} {...props} />);

    return $(':checkbox', ReactDOM.findDOMNode(component));
  }

  it('should mark the checkbox when checked', function() {
    const $checkbox = renderCheckbox({ checked: true });

    expect($checkbox.is(':checked')).to.be.true;
  });

  it('should not mark the checkbox when unchecked', function() {
    const $checkbox = renderCheckbox({ checked: false });

    expect($checkbox.is(':checked')).to.be.false;
  });
});
