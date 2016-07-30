import Parent from '../../../src/components/parent.jsx';
import fixture from '../../fixtures/parent/base.js';
import TestHelpers from '../../helpers.js';
import React from 'react/addons';
import $ from 'jquery';

const { TestUtils } = React.addons;


describe('Parent', function() {
  var component;
  var doStuffStub, loadChildStub;

  beforeEach(function() {
    loadChildStub = TestHelpers.stubMethod(Parent, 'loadChild', null);
    doStuffStub = TestHelpers.stubMethod(Parent, 'doStuff');

    component = TestHelpers.render(Parent, fixture);
  });

  it('should do stuff when clicking on the button', function() {
    TestUtils.Simulate.click(component.refs.btn.getDOMNode());

    expect(doStuffStub).to.have.been.calledOnce;
  });

  it('should render stuff', function() {
    expect($(component.refs.stuff.getDOMNode()).text()).to.equal('tomato');
  });

  it('should render a child', function() {
    expect(loadChildStub).to.have.been.calledWith('child');
  });
});
