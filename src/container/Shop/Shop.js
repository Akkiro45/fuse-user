import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import module from './Shop.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Shopc from '../../components/Shop/Shop';

class Shop extends Component {
  componentDidMount() {
    const shopSrchName = this.props.location.pathname; 
    if(shopSrchName === '/auth/signin' || shopSrchName === '/auth/signup') {
      this.props.history.replace('/');
    } else {
      this.props.fetchShop(shopSrchName.slice(1, shopSrchName.length));
    }
    this.props.onCatClick(null);
  }
  render() {
    let ren = null;
    if(this.props.error) {
      ren = <Redirect to='/' /> 
    }
    if(this.props.loading) {
      ren = (
        <div className={module.Spinner} >
          <Spinner />
        </div>
      );
    }
    if(this.props.shop) {
      ren = (
        <Shopc
          shop={this.props.shop}
          onCatClick={this.props.onCatClick}
          category={this.props.category}
          isAuth={this.props.isAuth}
          token={this.props.token}
          addToCart={this.props.addToCart}
          clearCartError={this.props.clearCartError}
          error={this.props.cartError}
          loading={this.props.cartLoading}
          setShopSrchName={this.props.setShopSrchName}
        />
      );
    }
    if(this.props.addedToCart) {
      ren = <Redirect to='/cart' />
    }
    return (
      <div className={module.Shop} >
        {ren}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.home.loading,
    error: state.home.shopError,
    shop: state.home.shop,
    category: state.shop.category,
    isAuth: state.auth.token !== null,
    cartError: state.shop.error,
    cartLoading: state.shop.loading,
    token: state.auth.token,
    addedToCart: state.shop.added
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchShop: (shopSrchName) => dispatch(actions.fetchShop(shopSrchName)),
    onCatClick: (category) => dispatch(actions.setActiveCat(category)),
    addToCart: (token, body) => dispatch(actions.addToCart(token, body)),
    clearCartError: () => dispatch(actions.clearCartError()),
    setShopSrchName: (shopSrchName) => dispatch(actions.setShopSrchName(shopSrchName))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Shop));