import React from 'react';

import module from './Item.module.css';
import CrossIcon from '../../../UI/Icons/Cross/Cross';
import Incr from '../../../Shop/Incr/Incr';

const item = (props) => {
  let p = (
    <div className={module.Price} >
      <div>Rs. {props.price * props.quantity}</div>
    </div>
  );
  if(props.bucket) {
    p = (
      <div className={module.Bucket} >
        <div className={module.Icon} >
          <div className={module.Cross} >
            <CrossIcon onClick={props.rmvItem} />
          </div>
        </div>
        <div className={module.P} >Rs. {props.price * props.quantity}</div>
        <div className={module.Incr} >
          <Incr
            marginTop='0'
            value={props.quantity}
            onInc={props.onInc}
            onDec={props.onDec}
          />
        </div>
      </div>
    );
  }
  return (
    <div className={module.Item} >
      <div className={module.Container} >
        <div className={module.Photo} >
          <img src={props.src ? props.src : 'https://www.image.ie/images/no-image.png'} alt={props.name} />
        </div>
        <div className={module.Both} >
          <div className={module.Info} >
            <div className={module.Sub} >
              <div className={module.Name} >{props.name}</div>
              <div className={module.Category} >{props.category}</div>
              <div className={module.Unit} >{props.mUnit} {props.mValue}</div>
              <div className={module.Quntity} >{props.quantity} &#10006; {props.price}</div>
            </div>
          </div>
          {p}
        </div>
      </div>
    </div>
  );
}

export default item;