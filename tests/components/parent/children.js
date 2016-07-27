var React = require('react'),
    Parent = React.createFactory(require('../../../src/components/parent.jsx')),
    TestUtils = require('react/addons').addons.TestUtils,
    TestHelpers = require('../../helpers.js');


describe('Parent', function() {
  var component;

  beforeEach(function() {
    TestHelpers.stubMethod(Parent, 'loadChild', null);

    component = React.render(Parent(), this.container);
  });

  describe('Child', function() {
    var props;

    beforeEach(function() {
      props = TestHelpers.getChildProps(component, 'child');
    });

    it('should send foo', function() {
      expect(props.foo).to.equal('bar');
    });

    it('should send a callback to change foo', function() {
      expect(props.callback).to.equal(component.changeFoo);
    });
  });
});
