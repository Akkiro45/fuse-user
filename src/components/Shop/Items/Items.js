import React from 'react';

import module from './Items.module.css';
import Item from './Item/Item';
import { compareItem, capatalize } from '../../../shared/utility';

const items = (props) => {
  let allItems = null;
  let is = props.items;
  if(props.category) {
    is = props.items.filter(i => i.category === props.category);
  }
  is = is.sort(compareItem);
  allItems = is.map((itm) => {
    return (
      <Item 
        key={itm._id}
        item={itm}
        isStatic={props.isStatic}
        onAddItem={props.onAddItem}
      />
    );
  });
  return (
    <div className={module.Items} >
      <div className={module.Title} >
        {props.category ? capatalize(props.category) : 'All'} Products
      </div>
      <div className={module.Container} >
        {allItems}
      </div>
    </div>
  );
}

export default items;