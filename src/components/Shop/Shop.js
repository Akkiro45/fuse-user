import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import module from './Shop.module.css';
import ShopProfile from './ShopProfile/ShopProfile';
import Category from './Category/Category';
import Items from './Items/Items';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import Link from '../UI/Link/Link';
import Bucket from './Bucket/Bucket';
import Spinner from '../UI/Spinner/Spinner';
import { filterCart } from '../../shared/utility';

class Shop extends Component {
  state = {
    error: null,
    bucket: []
  }
  addItemToBucket = (item, mValue) => {
    this.setState(prevState => {
      let bucket = [...prevState.bucket];
      bucket = bucket.filter(i => {
        if(i._id !== item._id) {
          return true;
        } else {
          if(i.mValue !== mValue) {
            return true;
          } else {
            return false;
          }
        }
      });
      bucket.unshift(item);
      return { bucket };
    });
  }
  updateItemFromBucket = (itemID, add, mValue) => {
    this.setState(prevState => {
      let bucket = [...prevState.bucket];
      let i = bucket.findIndex(itm => ( itm._id === itemID && itm.mValue === mValue ));
      if(i !== -1) {
        if(add && bucket[i].quantity < 100) {
          bucket[i].quantity +=  1;
        } else if(!add && bucket[i].quantity > 1) {
          bucket[i].quantity -=  1;
        }
        return { bucket };
      }
    });
  }
  removeItemFromBucket = (itemID, mValue) => {
    this.setState(prevState => {
      let bucket = [...prevState.bucket];
      bucket = bucket.filter(i => {
        if(i._id !== itemID) {
          return true;
        } else {
          if(i.mValue !== mValue) {
            return true;
          } else {
            return false;
          }
        }
      });
      return { bucket };
    });
  }
  onAddItem = (item, quantity) => {
    if(this.props.isAuth) {
      this.addItemToBucket({ ...item, quantity }, item.mValue);
    } else {
      this.props.setShopSrchName(this.props.history.location.pathname);
      this.props.history.replace('/auth/signin');  
    }
  }
  onClearError = () => {
    this.setState({ error: null });
  }
  render() {
    let loading = null;
    if(this.props.loading) {
      let lod = (
        <Spinner />
      );
      loading = (
        <ErrorHandler 
          error={lod}
        />
      )
    }
    let cartError = null;
    if(this.props.error) {
      cartError = (
        <ErrorHandler 
          error={this.props.error}
          errorConformedhandler={this.props.clearCartError}
        />
      );
    }
    let bucket = null;
    if(this.state.bucket.length > 0) {
      bucket = (
        <div className={module.Bucket} >
          <Bucket 
            bucket={this.state.bucket}
            removeItem={this.removeItemFromBucket}
            updateItem={this.updateItemFromBucket}
            deliverycharge={this.props.shop.deliveryCharge}
            addToCart={() => this.props.addToCart(this.props.token, filterCart(this.state.bucket, this.props.shop._id))}
          />
        </div>
      );
    }
    let error = null;
    if(this.state.error) {
      let e = (
        <div className={module.E} >
          <span className={module.T} >Please</span>
          <Link to='/auth/signin' blue >Signin</Link>
          <span className={module.T} >Or</span> 
          <Link to='/auth/signup' blue >Signup</Link>
        </div>
      );
      error = (
        <ErrorHandler 
          error={this.state.error ? e : this.state.error}
          errorConformedhandler={this.onClearError}
        />
      );
    }
    let cat = (
      <div className={module.Error} >
        No Item for Sale!
      </div>
    );
    let items = null;
    if(this.props.shop.items.length !== 0) {
      cat = (
        <Category 
          categories={this.props.shop.itemCategories}
          items={this.props.shop.items}
          onCatClick={this.props.onCatClick}
          category={this.props.category}
        />
      );
      items = (
        <Items
          category={this.props.category}
          items={this.props.shop.items}
          isStatic={this.props.shop.isStatic}
          onAddItem={this.onAddItem}
        />
      )
    }
    return (
      <div className={module.Shop} >
        <ShopProfile 
          shop={this.props.shop}
        />
        {error}
        {cat}
        {items}
        {bucket}
        {loading}
        {cartError}
      </div>
    );
  }
}

export default withRouter(Shop);