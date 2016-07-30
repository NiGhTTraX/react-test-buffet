var React = require('react'),
    Parent = require('../../../src/components/parent.jsx'),
    TestUtils = require('react/addons').addons.TestUtils,
    TestHelpers = require('../../helpers.js'),
    $ = require('jquery');


describe('Parent', function() {
  var component;
  var doStuffStub, loadChildStub;


  beforeEach(function() {
    loadChildStub = TestHelpers.stubMethod(Parent, 'loadChild', null);
    doStuffStub = TestHelpers.stubMethod(Parent, 'doStuff');

    component = React.render(<Parent />, this.container);
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
