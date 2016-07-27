var React = require('react'),
    Child = require('../../../src/components/child.jsx'),
    TestUtils = require('react/addons').addons.TestUtils,
    $ = require('jquery');


describe('Child', function() {
  var component;


  beforeEach(function() {
    component = React.render(<Child />, this.container);
  });

  it('should render foo', function() {
    expect($(component.refs.foo.getDOMNode()).text()).to.equal('bar');
  });
});
