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
      {items.map((item, index) =>
        <li key={index}>
          <Item {...item} onSelect={() => { onSelect({ index }); }} />
        </li>
      )}
    </ul>;
  }
}
