import React, { Component } from 'react';
import { connect } from 'react-redux';

import module from './Profile.module.css';
import UserProfile from './UserProfile/UserProfile';
import { capatalize } from '../../shared/utility';
import Addresses from './Addresses/Addresses';
import Orders from './Orders/Orders';
import * as actions from '../../store/actions/index';

class Profile extends Component {
  state = {
    addrs: false,
    pageNumber: 1,
    pageSize: 20,
    addAddress: false
  }
  addAddressPopup = () => {
    this.setState(prevState => {
      return { addAddress: !prevState.addAddress };
    });
  }
  onTabClick = (type) => {
    let flag = true;
    if(type === 'addrs') {
      flag = true;
    } else {
      this.props.clearOrders();
      this.props.fetchOrders(this.props.token, 1, this.state.pageSize);
      flag = false;
    }
    this.setState({ addrs: flag, pageNumber: 1, pageSize: this.state.pageSize });
  }
  onScrollHandle = (e) => {
      if(!this.state.addrs) {
        const bottom = parseInt(e.target.scrollHeight - e.target.scrollTop) === parseInt(e.target.clientHeight);
      if(bottom && !this.props.done) {
        this.props.fetchOrders(this.props.token, this.state.pageNumber + 1, this.state.pageSize);
        this.setState(prevState => {
          return { pageNumber: prevState.pageNumber + 1 };
        });
      }
    }
  }
  componentDidMount() {
    this.props.clearOrders();
    this.props.fetchOrders(this.props.token, 1, this.state.pageSize);
  }
  render() {
    const name = capatalize(this.props.firstName) + ' ' + capatalize(this.props.lastName);
    let clNameTab1 = [module.Tab1];
    let clNameTab2 = [module.Tab2];
    if(this.state.addrs) {
      clNameTab1 = [module.Tab1, module.Active];
      clNameTab2 = [module.Tab2];
    } else {
      clNameTab2 = [module.Tab2, module.Active];
      clNameTab1 = [module.Tab1];
    }
    let window = null;
    if(this.state.addrs) {
      window = (
        <Addresses 
          addrs={this.props.addresses}
          show={this.state.addAddress}
          onAddAddressClick={this.addAddressPopup}
        />
      );
    } else {
      window = (
        <Orders 
          loading={this.props.loading}
          orders={this.props.orders}
          error={this.props.error}
          done={this.props.done}
          token={this.props.token}
          cancelOrder={this.props.cancelOrder}
          cancelLoading={this.props.cancelLoading}
          cancelError={this.props.cancelError}
          currID={this.props.currID}
        />
      );
    }
    let ren = null;
    ren = (
      <div>
        <UserProfile 
          name={name}
          phoneNumber={this.props.phoneNumber}
          email={this.props.email}
        />
        <div className={module.Tab} >
          <div onClick={() => this.onTabClick('addrs')} className={clNameTab1.join(' ')} >
            My Addresses
          </div>
          <div onClick={() => this.onTabClick('odrs')} className={clNameTab2.join(' ')} >
            My Orders
          </div>
        </div>
        <div className={module.Window} >
          {window}
        </div>
      </div>
    );
    return (
      <div className={module.Profile} onScroll={this.onScrollHandle} >
        {ren}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
    phoneNumber: state.auth.phoneNumber,
    email: state.auth.email,
    addresses: state.auth.address,
    token: state.auth.token,
    loading: state.orders.loading,
    error: state.orders.error,
    orders: state.orders.orders,
    done: state.orders.done,
    cancelLoading: state.orders.cancelLoading,
    cancelError: state.orders.cancelError,
    currID: state.orders.currID
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: (token, pageNumber, pageSize) => dispatch(actions.fetchOrders(token, pageNumber, pageSize)),
    clearOrders: () => dispatch(actions.clearOrders()),
    cancelOrder: (token, orderID) => dispatch(actions.cancelOrder(token, orderID))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);