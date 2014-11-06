var React = require('react'),
    TestUtils = require('react/addons').addons.TestUtils,
    TestHelpers = require('../../helpers.js'),
    proxyquire = require('proxyquireify')(require);


describe('Parent', function() {
  var component;


  beforeEach(function() {
    var stubs = TestHelpers.genComponentStub('./child.jsx'),
        Parent = React.createFactory(
                     proxyquire('../../../src/components/parent.jsx', stubs));

    component = React.render(Parent(), this.container);
  });

  it('should send foo', function() {
    expect(component.refs.child.props.foo).to.equal('bar');
  });

  it('should send a callback to change foo', function() {
    expect(component.refs.child.props.callback).to.equal(component.changeFoo);
  });
});

