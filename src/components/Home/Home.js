import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import module from './Home.module.css';
import ShopCard from './ShopCard/ShopCard';
import Filters from './Filters/Filters';
import Aux from '../../hoc/Auxx/Auxx';
import Spinner from '../UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { convertAddress } from '../../shared/utility';
import Add from './Add/Add';

class Home extends Component {
  componentDidMount() {
    if(this.props.shops.length === 0) {
      this.props.fetchShops(this.props.filters, 1, this.props.pageSize);
    }
  }
  onScrollHandle = (e) => {
    const bottom = parseInt(e.target.scrollHeight - e.target.scrollTop) === parseInt(e.target.clientHeight);
    if(bottom && !this.props.done) {
      this.props.fetchMoreShops(this.props.filters, this.props.pageNumber + 1, this.props.pageSize);
      this.props.increasePageNumber();
    }
  }
  onShopClick = (shopSrchName) => {
    this.props.history.push(shopSrchName);
  }
  render() {
    let shops = null;
    if(this.props.shops.length > 0) {
      shops = this.props.shops.map((s, i) => {
        return (
          <ShopCard 
            key={i}
            isStatic={s.isStatic} 
            name={s.shopName}
            address={convertAddress(s.shopAddress[0])}
            category={s.shopCategories}
            onShopClick={() => this.onShopClick(s.shopSrchName)}
            />
        );
      });
    } else {
      shops = (
        <div className={module.Error} >
          No shops found!
        </div>
      );
    }
    let extra = null;
    if(this.props.moreLoading) {
      extra = ( <Spinner /> );
    } else if(this.props.done && !this.props.loading) {
      if(this.props.shops.length > 0)
        extra = <div className={module.Exta} >No More Shops!</div>;
    }
    let ren = null;
    ren = (
      <Aux>
        <div className={module.Window} onScroll={this.onScrollHandle}>
          <Add />
          {shops}
          {extra}
        </div>
      </Aux>
    ); 
    if(this.props.loading) {
      ren = (
        <div className={module.Window} >
          <div className={module.Spinner} >
            <Spinner />
          </div>
        </div>
      );
    }
    if(this.props.error) {
      ren = (
        <div className={module.Error} >
          Something went wrong!
          <br />
          Please try again.
        </div>
      )
    }
    return (
      <div className={module.Home} >
        <div className={module.Sidebar} >
          <Filters 
            isAuth={this.props.isAuth}
            fetchShops={this.props.fetchShops}
            address={this.props.address}
            pageNumber={this.props.pageNumber}
            pageSize={this.props.pageSize}
            setFilters={this.props.setFilters}
            unsetFilters={this.props.unsetFilters}
            resetPageNumber={this.props.resetPageNumber}
            addAddressPopup={this.props.addAddressPopup}
          />
        </div>
        {ren} 
      </div>
    );
  }
}

const mapStatToProps = state => {
  return {
    loading: state.home.loading,
    error: state.home.error,
    shops: state.home.shops,
    address: state.auth.address,
    moreLoading: state.home.moreLoading,
    done: state.home.done,
    filters: state.home.filters
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchShops: (body, pageNumber, pageSize) => dispatch(actions.fetchShops(body, pageNumber, pageSize)),
    fetchMoreShops: (body, pageNumber, pageSize) => dispatch(actions.fetchMoreShops(body, pageNumber, pageSize)),
    setFilters: (filters) => dispatch(actions.setFilters(filters)),
    unsetFilters: () => dispatch(actions.unsetFilters())
  }
}

export default withRouter(connect(mapStatToProps, mapDispatchToProps)(Home));