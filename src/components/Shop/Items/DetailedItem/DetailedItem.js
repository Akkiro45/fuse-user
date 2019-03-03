import React from 'react';

import module from './DetailedItem.module.css';
import Aux from '../../../../hoc/Auxx/Auxx';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import Label from '../../Label/Label';
import Incr from '../../Incr/Incr';
import Button from '../../../UI/Button/Button';
import { checkwhiteSpaces, getRSelect, generateOptions } from '../../../../shared/utility';

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
            <Button bradius='4px' bgcolor='#00d348' onClick={props.onAddItem} >Add</Button>
          </div>
        </div>
      );
    }
  let description = null; 
  if(!checkwhiteSpaces(props.item.description)) {
    description = (
      <div className={module.Bottom} >
        <Label>About Item :</Label>
        <div className={module.Description} >
          {props.item.description}
        </div>
      </div>
    );
  }
  let mValues = null;
    if(props.item.mpValues.length === 1) {
      mValues = props.item.mpValues[0].mValue;
    } else {
      const ops = props.item.mpValues.map(mpv => mpv.mValue);
      mValues = (
        <div className={module.Select} >
          {getRSelect(props.mValue, generateOptions(ops), props.onSelectHandler, 'mValue')}
        </div>
      );
    }
    let mUnit = (
      <div className={module.MUnit} >
        {props.item.mUnit} : {mValues}
      </div>  
    );
    if(props.item.mpValues.length > 1) {
      mUnit = (
        <div className={module.MUnit} >
          <div className={module.Unit} >
            {props.item.mUnit}
          </div>
          <div className={module.Sap} >
            :
          </div>
          <div className={module.Values} >
            {mValues}
          </div>
        </div>
      );
    }
  let className = module.Top;
  if(props.isStatic) {
    className = module.Top1;
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
          <div className={className} >
            <div className={module.Photo} >
              {/* eslint-disable-next-line */}
              <img src={props.src} className={module.Img} />
            </div>
            <div className={module.Info} >
              <div className={module.CInfo} >
                <div className={module.Name} >
                  {props.item.name}
                </div>
                <div className={module.Category} >
                  {props.item.category}
                </div>
                {mUnit}
                <div className={module.IB} >
                  <div className={module.Price} >
                    Rs. {props.price}
                  </div>
                  {controlls}
                </div>
              </div>
            </div>
          </div>
          {description}
        </div>
      </div>
      <Backdrop show={props.show} onclick={props.onDetail}/>
    </Aux>
  );
}

export default detailedItem;