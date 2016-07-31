import React, { Component, PropTypes } from 'react';


export default class Child extends Component {
  render() {
    return <div>
      Foo is now <span ref="foo">{this.props.foo}</span>
      <button ref="btn" onClick={this.changeFoo}>Let us change it!</button>
    </div>;
  }

  componentWillReceiveProps(nextProps) {
    const { foo } = nextProps;

    if (foo === 'foobar') {
      this.foo = 42;
    } else {
      this.foo = foo;
    }
  }

  changeFoo() {
    this.props.callback('baz');
  }

  _dontMindMe() {
    // This function is not covered by tests.
    this.foo = -1;
  }
}

Child.defaultProps = {
  foo: 'bar'
};

Child.propTypes = {
  foo: PropTypes.string,
  callback: PropTypes.func.isRequired
};
