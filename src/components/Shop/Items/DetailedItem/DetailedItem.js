import React from 'react';

import module from './DetailedItem.module.css';
import Aux from '../../../../hoc/Auxx/Auxx';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import Label from '../../Label/Label';
import Incr from '../../Incr/Incr';
import Button from '../../../UI/Button/Button';

const detailedItem = (props) => {
  let controlls = null;
    if(!props.isStatic) {
      controlls = (
        <div className={module.Cotrolls} >
          <div className={module.Incr} >
            <Incr 
              value={props.value}
              onInc={props.onInc}
              onDec={props.onDec}
            />
          </div>
          <div className={module.AddB} >
            <Button onClick={props.onAddItem} >Add</Button>
          </div>
        </div>
      );
    }
  return (
    <Aux>
      <div 
        className={module.DetailedItem}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0'}}
      >
        <div className={module.Container} >
          <div className={module.Top} >
            <div className={module.Photo} >
              {/* eslint-disable-next-line */}
              <img src={props.item.src ? props.item.src : 'https://www.image.ie/images/no-image.png'} className={module.Img} />
            </div>
            <div className={module.Info} >
              <div className={module.CInfo} >
                <div className={module.Name} >
                  {props.item.name}
                </div>
                <div className={module.Category} >
                  {props.item.category}
                </div>
                <div className={module.MUnit} >
                  {props.item.mUnit} : {props.item.mValue}
                </div>
                <div className={module.IB} >
                  <div className={module.Price} >
                    Rs. {props.item.price}
                  </div>
                  {controlls}
                </div>
              </div>
            </div>
          </div>
          <div className={module.Bottom} >
            <Label>About Item :</Label>
            <div className={module.Description} >
              {props.item.description}
            </div>
          </div>
        </div>
      </div>
      <Backdrop show={props.show} onclick={props.onDetail}/>
    </Aux>
  );
}

export default detailedItem;