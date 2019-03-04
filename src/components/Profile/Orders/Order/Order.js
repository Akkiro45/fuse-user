import React, { Component } from 'react';

import module from './Order.module.css';
import UpArrowIcon from '../../../UI/Icons/UpArrow/UpArrow';
import DownArrowIcon from '../../../UI/Icons/DownArrow/DownArrow';
import Block from '../../../Cart/Success/Block/Block';
import Item from '../../../Cart/Items/Item/Item';
import ListIcon from '../../../UI/Icons/List/List';
import RightArrow from '../../../UI/Icons/RightArrow/RightArrow';
import LocIcon from '../../../UI/Icons/Loc/Loc';
import VerifiedIcon from '../.././../UI/Icons/Verified/Verified';
import { convertAddress } from '../../../../shared/utility';
import TimeHeader from './TimeHeader/TimeHeader';
import Status from './Status/Status';

class Order extends Component {
  state = {
    show: false  
  }
  onShow = () => {
    this.setState(prevState => {
      return { show: !prevState.show };
    });
  }
  render() {
    let items = null;
    items = this.props.items.map((itm, i) => {
      return (
        <Item 
          key={i}
          name={itm.name}
          category={itm.category}
          mUnit={itm.mUnit}
          mValue={itm.mValue}
          quantity={itm.quantity}
          price={itm.price}
          src={itm.photo.name}
        />  
      );
    });
    let window = null;
    const t = parseInt(this.props.subTotal) + parseInt(this.props.deliveryCharge);
    const total = 'Rs. ' + t;
    if(this.state.show) {
      window = (
        <div className={module.Window} >
          <hr />
          <div className={module.Summary} >
            <Block 
              icon1={<ListIcon />}
              icon2={<RightArrow color='#2874ff' />}
              text1='Total Amount'
              text2={total}
            />
            <hr />
            <Block 
              icon1={<VerifiedIcon />}
              icon2={<RightArrow color='#2874ff' />}
              text1='Payment'
              text2='Cash on Delivery'
            />
            <hr />
            <Block 
              icon1={<LocIcon />}
              icon2={<RightArrow color='#2874ff' />}
              text1='Delivery Address'
              text2={convertAddress(this.props.address)}
              address
            />  
          </div>
          <hr />
          <div className={module.OTitle} >
            Item Ordered
          </div>
          <div className={module.Items} >
            {items}
          </div>
        </div>
      );
    } 
    let orderTimestamp = this.props.status.find(ts => ts.type === 2);
    return (
      <div className={module.Order} >
        <TimeHeader timeStamp={orderTimestamp.timeStamp} />
        <div className={module.Header} >
        <div className={module.Title} >
          {this.props.shopName}
        </div>
        </div>
        <div className={module.Status} >
          <Status 
            status={this.props.status}
            cancelOrder={this.props.cancelOrder}
            loading={this.props.cancelLoading}
            error={this.props.cancelError}
            orderID={this.props.orderID}
            currID={this.props.currID}
            deliveryTime={this.props.deliveryTime}
            allowCancelOrder={this.props.allowCancelOrder}
          />
        </div>
        {window}
        <div className={module.Footer} onClick={this.onShow} >
          <div className={module.IconC} >
            {this.state.show ? (<UpArrowIcon />) : (<DownArrowIcon />)}
          </div>
          <div className={module.FText} >
              {this.state.show ? 'Hide' : 'Show' } More Information
          </div>
        </div>
      </div>
    );
  }
}

export default Order;