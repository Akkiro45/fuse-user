import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import module from './Layout.module.css';
import Header from '../../components/Header/Header';
import MNav from '../../components/MNav/MNav';
import SideDrawer from '../../components/SideDrawer/SideDrawer';
import * as actions from '../../store/actions/index';
// Async import
import Home from '../../components/Home/Home';
import Cart from '../../components/Cart/Cart';
import Profile from '../../components/Profile/Profile';
import Shop from '../Shop/Shop';
import AddAddress from '../../components/Cart/AddAddress/AddAddress';
import Popup from '../../hoc/ErrorHandler/ErrorHandler';

class Layout extends Component {
  state = {
    showSideDrawer: false,
    pageSize: 20,
    pageNumber: 1,
    showAddAddress: false
  }
  addAddressPopup = () => {
    this.setState(prevState => {
      return { showAddAddress: !prevState.showAddAddress };
    });
  }
  increasePageNumber = () => {
    this.setState(prevState => {
      return { pageNumber: prevState.pageNumber + 1 };
    });
  }
  resetPageNumber = () => {
    this.setState({ pageNumber: 1 });
  }
  sideDrawerColsedHandler = () => {
    this.setState({showSideDrawer: false});
  }
  openSideDrawerHandler = () => {
    this.setState((prevState) => { 
        return {showSideDrawer: !prevState.showSideDrawer} 
    });
  }
  componentDidMount() {
    if(this.props.shopSrchName) {
      this.props.history.replace(this.props.shopSrchName);
      this.props.setShopSrchName(null);
    }
  }
  render(){
    let addAddress = null;
    if(this.state.showAddAddress) {
      addAddress = (
        <Popup
          error={<AddAddress off={this.addAddressPopup} />}
          errorConformedhandler={this.addAddressPopup}
        />
      );
    }
    let show = null;
    if(this.props.type === 'shop') {
      show = <Shop />
    }
    else if(this.props.type === 'home') 
      show = <Home 
                isAuth={this.props.isAuthenticated}
                pageNumber={this.state.pageNumber}
                pageSize={this.state.pageSize}
                increasePageNumber={this.increasePageNumber}
                resetPageNumber={this.resetPageNumber}
                addAddressPopup={this.addAddressPopup} />
    else if(this.props.type === 'cart') show = <Cart />
    else if(this.props.type === 'profile') show = <Profile />
    return (
      <div className={module.Layout} >
        {addAddress}
        <SideDrawer 
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer} 
          closed={this.sideDrawerColsedHandler}
          fetchShops={this.props.fetchShops}
          pageNumber={this.state.pageNumber}
          pageSize={this.state.pageSize}
          address={this.props.address}
          setFilters={this.props.setFilters}
          unsetFilters={this.props.unsetFilters}
          resetPageNumber={this.resetPageNumber}
          addAddressPopup={this.addAddressPopup} />
        <div>
          <Header 
            openSideDrawerHandler={this.openSideDrawerHandler}
            isAuthenticated={this.props.isAuthenticated}
            type={this.props.type}
            error={this.props.hError ? this.props.hError : this.props.hLoading} />
        </div>
        <div className={module.Window} >
          {show}
        </div>
        <div className={module.MNav} >
          <MNav 
            isAuthenticated={this.props.isAuthenticated}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    hError: state.home.error,
    hLoading: state.home.loading,
    address: state.auth.address,
    shopSrchName: state.shop.shopSrchName
  }
}
const mapDispAtchToProps = dispatch => {
  return {
    fetchShops: (body, pageNumber, pageSize) => dispatch(actions.fetchShops(body, pageNumber, pageSize)),
    setFilters: (filters) => dispatch(actions.setFilters(filters)),
    unsetFilters: () => dispatch(actions.unsetFilters()),
    setShopSrchName: (shopSrchName) => dispatch(actions.setShopSrchName(shopSrchName))
  }
}

export default withRouter(connect(mapStateToProps, mapDispAtchToProps)(Layout));