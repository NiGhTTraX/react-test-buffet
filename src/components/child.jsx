var React = require('react');


module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      foo: 'bar'
    }
  },

  render: function() {
    return <div>
      Foo is now <span ref="foo">{this.props.foo}</span>
      <button ref="btn" onClick={this.changeFoo}>Let us change it!</button>
    </div>;

    var unreachableCode = 3;
  },

  componentWillReceiveProps: function(nextProps) {
    if (1) {
      this.foo = nextProps.foo;
    } else {
      // Unreachable branch.
      alert('waaaa');
    }
  },

  changeFoo: function() {
    this.props.callback('baz');
  },

  dontMindMe: function() {
    // This function is not covered by tests.
    alert('tra la la');
  }
});

