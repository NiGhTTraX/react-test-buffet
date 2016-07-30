var React = require('react'),
    Child = require('../../../src/components/child.jsx'),
    fixture = require('../../fixtures/child/base.js'),
    TestHelpers = require('../../helpers.js'),
    $ = require('jquery');


describe('Child', function() {
  var component;

  beforeEach(function() {
    component = TestHelpers.render(Child, fixture);
  });

  it('should render foo', function() {
    expect($(component.refs.foo.getDOMNode()).text()).to.equal('bar');
  });
});
