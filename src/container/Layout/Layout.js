import React, { Component } from 'react';
import { connect } from 'react-redux';

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

class Layout extends Component {
  state = {
    showSideDrawer: false,
    pageSize: 10,
    pageNumber: 1
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
  render(){
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
                resetPageNumber={this.resetPageNumber} />
    else if(this.props.type === 'cart') show = <Cart />
    else if(this.props.type === 'profile') show = <Profile />
    return (
      <div className={module.Layout} >
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
          resetPageNumber={this.resetPageNumber} />
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
    address: state.auth.address
  }
}
const mapDispAtchToProps = dispatch => {
  return {
    fetchShops: (body, pageNumber, pageSize) => dispatch(actions.fetchShops(body, pageNumber, pageSize)),
    setFilters: (filters) => dispatch(actions.setFilters(filters)),
    unsetFilters: () => dispatch(actions.unsetFilters())
  }
}

export default connect(mapStateToProps, mapDispAtchToProps)(Layout);