import React from 'react';

import module from './CartItem.module.css';
import Items from '../Items/Items';
import RightArrowIcon from '../../UI/Icons/RightArrow/RightArrow';
import CrossIcon from '../../UI/Icons/Cross/Cross';
import TimeHeader from '../../Profile/Orders/Order/TimeHeader/TimeHeader';

const cart = (props) => {
  let timeStamp = props.status.find(s => s.type === 0);
  return (
    <div className={module.Cart} >
      <TimeHeader timeStamp={timeStamp.timeStamp} />
      <div className={module.NameC} >
        <div className={module.Name} >
          <div className={module.SName} >
            {props.shopname}
          </div>
          <div className={module.CIcon} >
            <CrossIcon
              onClick={props.onDelCart}
            />
          </div>
        </div>
      </div>
      <Items 
        items={props.items}
        deliverycharge={props.deliverycharge}
        subtotal={props.totalCost}
      />
      <div className={module.FooterC} onClick={props.onProceed} >
        <div className={module.Footer} >
          <div className={module.Text} >
            Proceed To Checkout
          </div>
          <div className={module.Icon} >
            <RightArrowIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default cart;