import React from 'react';

import module from './Items.module.css';
import Item from './Item/Item';
import Summary from '../Summary/Summary';

const items = (props) => {
  let itms = null;
  let total = 0;
  let subTotal = 0;
  let deliveryCharge = 0;
  itms = props.items.map((is, i) => {
    subTotal = subTotal + (parseInt(is.price) * parseInt(is.quantity));
    return (
      <Item 
        key={i}
        name={is.name}
        category={is.category}
        mUnit={is.mUnit}
        mValue={is.mValue}
        quantity={is.quantity}
        price={is.price}
        bucket={props.bucket}
        rmvItem={props.bucket ? () => props.rmvItem(is._id, is.mValue) : null}
        onInc={props.bucket ? () => props.updateItem(is._id, true, is.mValue) : null}
        onDec={props.bucket ? () => props.updateItem(is._id, false, is.mValue) : null}
        src={is.photo.name}
      />
    );
  });
  
  if(props.subtotal) subTotal = props.subtotal;
  total = parseInt(subTotal) + parseInt(props.deliverycharge);
  deliveryCharge = props.deliverycharge;
  return (
    <div className={module.Box} >
      <div className={module.Items} >
        {itms}
      </div>
      <Summary 
        subTotal={subTotal}
        deliveryCharge={deliveryCharge}
        total={total}
        />
    </div>
  );
}

export default items;