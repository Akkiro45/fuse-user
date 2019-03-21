import React, { Component } from 'react';

import module from './Items.module.css';
import Item from './Item/Item';
import { compareItem, capatalize, getRInput, updateObject, searchItem } from '../../../shared/utility';

class Items extends Component {
  state = {
    search: {
      name: 'search',
      type: 'text',
      placeholder: 'Search item...',
      value: '',
      bradius: '4px'
    }
  }
  onInputChangeHandler = (e) => {
    const updatedSearch = updateObject(this.state.search, { value: e.target.value });
    this.setState({ search: updatedSearch });
  }
  render() {
    let allItems = null;
    let is = this.props.items;
    if(this.props.category) {
      is = this.props.items.filter(i => i.category === this.props.category);
    }
    is = is.sort(compareItem);
    is = searchItem(is, this.state.search.value);
    allItems = is.map((itm) => {
      return (
        <Item 
          key={itm._id}
          item={itm}
          isStatic={this.props.isStatic}
          onAddItem={this.props.onAddItem}
        />
      );
    });
    if(is.length === 0) {
      allItems = (
        <div className={module.Msg} >
          No Item Found!
        </div>
      );
    }
    return (
      <div className={module.Items} >
        <div className={module.Title} >
          {this.props.category ? capatalize(this.props.category) : 'All'} Products
        </div>
        <div className={module.Search} >
          {getRInput(this.state.search, this.onInputChangeHandler)}
        </div>
        <div className={module.Container} >
          {allItems}
        </div>
      </div>
    );
  }
}

export default Items;