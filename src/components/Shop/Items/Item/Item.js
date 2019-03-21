import React, { Component } from 'react';

import module from './Item.module.css';
import Incr from '../../Incr/Incr';
import Button from '../../../UI/Button/Button';
import DetailedItem from '../DetailedItem/DetailedItem';
import { getRSelect, updateObject, generateOptions, awsS3BucketUrl } from '../../../../shared/utility';
import OSIcon from '../../../UI/Icons/OS/OS';

class Item extends Component {
  state = {
    quantity: 1,
    show: false,
    mValue: {
      name: 'mValue',
      value: '',
      bradius: '4px'
    },
    price: ''
  }
  onSelectHandler = (e, type) => {
    const field = updateObject(this.state[type], { value: e.target.value });
    const obj = this.props.item.mpValues.find(mpv => mpv.mValue === e.target.value);
    let price = '';
    if(obj) {
      price = obj.price;  
    }
    this.setState({ [type]: field, price });
  }
  onInc = () => {
    this.setState(prevState => {
      if(prevState.quantity < 100) {
        return { quantity: prevState.quantity + 1 };
      }
    });
  }
  onDec = () => {
    this.setState(prevState => {
      if(prevState.quantity > 1) {
        return { quantity: prevState.quantity - 1 };
      }
    });
  }
  onDetail = () => {
    this.setState(prevState => {
      return { show: !prevState.show };
    });
  }
  onDetailAdd = () => {
    const item = {
      ...this.props.item
    };
    item.mValue = this.state.mValue.value;
    item.price = this.state.price;
    this.setState({ show: false });
    this.props.onAddItem(item, this.state.quantity);
  }
  componentDidMount() {
    const mValue = updateObject(this.state.mValue, { value: this.props.item.mpValues[0].mValue });
    this.setState({ quantity: 1, mValue, price: this.props.item.mpValues[0].price });
  }
  getPrice = () => {
    const obj = this.props.item.mpValues.find(mpv => mpv.mValue === this.state.mValue.value);
    if(obj) {
      return obj.price;
    } else {
      return '';
    }
  }
  render() {
    let src = null;
    if(this.props.item.photo) {
      src = awsS3BucketUrl + this.props.item.photo.name;
    }
    let detailedItem = null;
    if(this.state.show) {
      detailedItem = (
        <DetailedItem 
          value={this.state.quantity}
          onInc={this.onInc}
          onDec={this.onDec}
          isStatic={this.props.isStatic}
          item={this.props.item}
          onDetail={this.onDetail}
          show={this.state.show}
          onAddItem={this.onDetailAdd}
          mValue={this.state.mValue}
          price={this.state.price}
          onSelectHandler={this.onSelectHandler}
          src={src}
        />
      );
    }
    let controlls = null;
    if(!this.props.isStatic) {
      const item = {
        ...this.props.item
      };
      item.mValue = this.state.mValue.value;
      item.price = this.state.price;
      controlls = (
        <div className={module.Controlls} >
          <div className={module.Incr} >
            <Incr 
              value={this.state.quantity}
              onInc={this.onInc}
              onDec={this.onDec}
            />
          </div>
          <div className={module.AddB} >
            <Button bradius='4px' bgcolor='#00d348' onClick={() => this.props.onAddItem(item, this.state.quantity)} >Add</Button>
          </div>
        </div>
      );
      if(this.props.item.outOfStock) {
        controlls = (
          <div className={module.Controlls} >
            <div className={module.OS} >
              Out of Stock
            </div>
          </div>
        );
      }
    }
    let mValues = null;
    if(this.props.item.mpValues.length === 1) {
      mValues = this.props.item.mpValues[0].mValue;
    } else {
      const ops = this.props.item.mpValues.map(mpv => mpv.mValue);
      mValues = (
        <div className={module.Select} >
          {getRSelect(this.state.mValue, generateOptions(ops), this.onSelectHandler, 'mValue')}
        </div>
      );
    }
    let mUnit = (
      <div className={module.MUnit} >
        {this.props.item.mUnit} : {mValues}
      </div>  
    );
    if(this.props.item.mpValues.length > 1) {
      mUnit = (
        <div className={module.MUnit1} >
          <div className={module.Unit} >
            {this.props.item.mUnit}
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
    let osi = null;
    if(this.props.item.outOfStock) {
      osi = (
        <div className={module.OSI} >
          <OSIcon />
        </div>
      );
    }
    return (
      <div className={module.Item} >
        {detailedItem}
          <div className={module.Container} >
            <div className={module.Top} >
              <div className={module.Photo} >
                {/* eslint-disable-next-line */}
                <img src={src} className={module.Img} />
                {osi}
              </div>
              <div className={module.Info} >
                <div className={module.Name} >
                  {this.props.item.name}
                </div>
                {mUnit}
                <div className={module.Price} >
                  Rs. {this.state.price}
                </div>
              </div>
            </div>
            <div className={module.Btns} >
              {controlls}
              <div className={module.DButton} >
                <Button bradius='4px' onClick={this.onDetail} >More Details</Button>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default Item;