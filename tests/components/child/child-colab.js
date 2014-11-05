var React = require('react'),
    Child = React.createFactory(require('../../../src/components/child.jsx')),
    TestUtils = require('react/addons').addons.TestUtils,
    sinon = require('sinon');


describe('Child', function() {
  var component;
  var changeFooCallback;


  beforeEach(function() {
    changeFooCallback = sinon.spy();

    component = React.render(Child({callback: changeFooCallback}),
                             this.container);
  });

  it('should call the parent to change foo', function() {
    component.changeFoo();
    expect(changeFooCallback).to.have.been.calledWith('baz');
  });
});

