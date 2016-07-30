var React = require('react'),
    Child = require('../../../src/components/child.jsx'),
    TestHelpers = require('../../helpers.js'),
    $ = require('jquery');


describe('Child', function() {
  var component;


  beforeEach(function() {
    component = TestHelpers.render(Child);
  });

  it('should render foo', function() {
    expect($(component.refs.foo.getDOMNode()).text()).to.equal('bar');
  });
});
