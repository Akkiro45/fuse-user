import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import module from './Cart.module.css';
import * as actions from '../../store/actions/index'; 
import CartIcon from '../UI/Icons/Cart/Cart';
import Spinner from '../UI/SpinnerPage/SpinnerPage';
import CartItem from './CartItem/CartItem';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import Confirmation from './Confirmation/Confirmation';
import Success from './Success/Success';

class Cart extends Component {
  state = {
    confirmation: false,
    success: false,
    orderID: null,
    subTotal: null,
    deliveryCharge: null,
    address: null
  }
  componentDidMount() {
    this.props.clearCartError();
    this.props.fetchOrders(this.props.token);
  }
  componentDidUpdate(prevProps) {
    if(prevProps.ordered !== this.props.ordered) {
      this.props.orderConfirmed();
      this.setState({ confirmation: false, success: true });
    }
  } 
  onProceed = (orderID, subTotal, deliveryCharge) => {
    this.setState(prevState => {
      return { confirmation: !prevState.confirmation, success: false, orderID, subTotal, deliveryCharge };
    });
  }
  onPlaceOrder = (address) => {
    const body = {
      orderID: this.state.orderID,
      addressID: address._id,
      type: 2
    }
    this.props.onOrder(this.props.token, body);
    this.setState({ address });
  }
  onRedirect = (type) => {
    if(type === 'status') {
      this.props.history.replace('/profile');
    } else if(type === 'home') {
      this.props.history.replace('/');
    }
  }
  render() {
    
    let cartDelError = null;
    if(this.props.cartError) {
      cartDelError = (
        <ErrorHandler 
          error={this.props.cartError}
          errorConformedhandler={this.props.cartErrorConfirmed}
        />
      );
    }
    let error = null;
    if(this.props.error && !this.props.loading) {
      error = (
        <div className={module.Error} >
          Unable To Fetch!
        </div>
      );
    } 
    let emptyMsg = null; 
    if(this.props.orders.length === 0 && !this.props.loading && !this.state.success) {
      emptyMsg = (
        <div className={module.EmptyMsg} >
          <div className={module.Icon} >
            <CartIcon />
          </div>
          <div className={module.Msg} >
            No item in your Cart!
          </div>
        </div>
      );
    }
    let loading = null;
    if(this.props.loading) {
      loading = ( <Spinner /> );
    }
    let orders = null;
    if(this.props.orders.length > 0 && !this.props.loading && !this.state.confirmation && !this.state.success) {
      orders = this.props.orders.map((order, i) => {
        return (
          <CartItem 
            key={i}
            status={order.status}
            items={order.items}
            totalCost={order.totalCost}
            shopname={order.shopName}
            deliverycharge={order.deliveryCharge}
            onDelCart={() => this.props.onDelCart(this.props.token, order._id)}
            onProceed = {() => this.onProceed(order._id, order.totalCost, order.deliveryCharge)}
          />
        );
      });
    }
    let confirmation = null;
    if(this.state.confirmation && !this.props.loading) {
      confirmation = (
        <Confirmation 
          firstName={this.props.firstName}
          lastName={this.props.lastName}
          phoneNumber={this.props.phoneNumber}
          address={this.props.address}
          subTotal={this.state.subTotal}
          deliveryCharge={this.state.deliveryCharge}
          orderID={this.state.orderID}
          onPlaceOrder={this.onPlaceOrder}
        />
      );
    }
    let success = null;
    if(this.state.success && !this.props.loading) {
      success = (
        <Success 
          total={parseInt(this.state.subTotal) + parseInt(this.state.deliveryCharge)}
          address={this.state.address}
          onRedirect={this.onRedirect}
        />
      );
    }
    return (
      <div className={module.Cart} >
        {emptyMsg}
        {loading}
        {error}
        {orders}
        {confirmation}
        {success}
        {cartDelError}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    loading: state.orders.loading,
    orders: state.orders.carts,
    error: state.orders.error,
    cartError: state.orders.cartError,
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
    phoneNumber: state.auth.phoneNumber,
    address: state.auth.address,
    ordered: state.orders.ordered
  }
}

const mapStateToDispatch = dispatch => {
  return {
    fetchOrders: (token) => dispatch(actions.fetchCart(token)),
    clearCartError: () => dispatch(actions.clearCartError()),
    onDelCart: (token, orderID) => dispatch(actions.onDelCart(token, orderID)),
    cartErrorConfirmed: () => dispatch(actions.cartErrorConfirmed()),
    onOrder: (token, body) => dispatch(actions.onOrder(token, body)),
    orderConfirmed: () => dispatch(actions.orderConfirmed())
  }
}

export default withRouter(connect(mapStateToProps, mapStateToDispatch)(Cart));