import React from 'react';


// eslint-disable-next-line jsx-a11y/no-static-element-interactions
const Item = ({ id, name, onSelect }) => <div onClick={onSelect}>
  {id} {name}
</div>;

export default {
  props: {
    Item,
    items: [{
      id: 1,
      name: 'foo'
    }, {
      id: 2,
      name: 'bar'
    }],
    onSelect: ({ id }) => { console.log(`${id} selected`); }
  }
};
