import React from 'react';

import module from './Orders.module.css';
import Spinner from '../../UI/Spinner/Spinner';
import Order from './Order/Order';

const orders = (props) => {
  let done = null;
  if(props.done && props.orders.length !== 0) {
    done = (
      <div className={module.EmptyMsg} >
        No More Orders!
      </div>
    );
  }
  let error = null;
  if(props.error) {
    error = (
      <div className={module.ErrorMsg} >
        Unable To Fetch!
      </div>
    );
  }
  let ren = null;
  if(props.orders.length === 0 && !props.loading) {
    ren = (
      <div className={module.EmptyMsg} >
        No Orders!
      </div>
    );
  } 
  if(props.orders.length > 0) {
    ren = props.orders.map((ord, i) => {
      return (
        <Order 
          key={i}
          items={ord.items}
          address={ord.address}
          deliveryCharge={ord.deliveryCharge}
          subTotal={ord.totalCost}
          deliveryTime={ord.deliveryTime}
          allowCancelOrder={ord.allowCancelOrder}
          shopName={ord.shopName}
          status={ord.status}
          cancelOrder={() => props.cancelOrder(props.token, ord._id)}
          cancelLoading={props.cancelLoading}
          cancelError={props.cancelError}
          orderID={ord._id}
          currID={props.currID}
        />
      );
    });
  }
  let loading = null;
  if(props.loading) {
    loading = (
      <Spinner />
    );
  }
  return (
    <div className={module.Orders} >
      {ren}
      {loading}
      {done}
      {error}
    </div>
  );
}

export default orders;