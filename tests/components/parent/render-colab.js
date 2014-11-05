var React = require('react'),
    Parent = React.createFactory(require('../../../src/components/parent.jsx')),
    TestUtils = require('react/addons').addons.TestUtils,
    TestHelpers = require('../../helpers.js'),
    $ = require('jquery');


describe('Parent', function() {
  var component;
  var doStuffSpy;


  beforeEach(function() {
    doStuffSpy = TestHelpers.spyOnMethod(Parent, 'doStuff');

    component = React.render(Parent(), this.container);
  });

  it('should call to do stuff', function() {
    TestUtils.Simulate.click(component.refs.btn.getDOMNode());
    expect(doStuffSpy).to.have.been.called;
  });

  it('should render stuff', function() {
    expect($(component.refs.stuff.getDOMNode()).text()).to.equal('tomato');
  });
});

