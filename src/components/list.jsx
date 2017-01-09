import React, { Component, PropTypes } from 'react';


export default class List extends Component {
  static propTypes = {
    className: PropTypes.string,
    Item: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired
  };

  render() {
    const { className, Item, items, onSelect } = this.props;

    return <ul className={className}>
      {items.map((item, index) =>
        <li key={index}>
          <Item {...item} onSelect={() => { onSelect({ index }); }} />
        </li>
      )}
    </ul>;
  }
}
