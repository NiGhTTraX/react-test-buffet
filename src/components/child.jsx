import React, { Component } from 'react';


export default class Child extends Component {
  render() {
    return <div>
      Foo is now <span ref="foo">{this.props.foo}</span>
      <button ref="btn" onClick={this.changeFoo}>Let us change it!</button>
    </div>;

    const unreachableCode = 3;
  }

  componentWillReceiveProps(nextProps) {
    if (1) {
      this.foo = nextProps.foo;
    } else {
      // Unreachable branch.
      alert('waaaa');
    }
  }

  changeFoo() {
    this.props.callback('baz');
  }

  dontMindMe() {
    // This function is not covered by tests.
    alert('tra la la');
  }
};

Child.defaultProps = {
  foo: 'bar'
};
