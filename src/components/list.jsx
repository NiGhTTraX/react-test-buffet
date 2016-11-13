import React, { Component, PropTypes } from 'react';


export default class List extends Component {
  static propTypes = {
    Item: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired
  };

  render() {
    const { Item, items, onSelect } = this.props;

    return <ul>
      {items.map(item =>
        <li key={item.id}>
          <Item {...item} onSelect={() => { onSelect(item.id); }} />
        </li>
      )}
    </ul>;
  }
}
