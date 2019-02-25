import React, { Component } from 'react';

import module from './Filters.module.css';
import CheckBox from '../../UI/CheckBox/CheckBox';
import Button from '../../UI/FormButton/Button';
import { shopCategories } from '../../../shared/options';
import { getInput, getSelect, updateObject, validateFilters, convertAddress } from '../../../shared/utility';

class Filters extends Component {
  state = {
    delivery: false,
    category: {
      value: 'Category',
      name: 'shopCategories',
      width: '150px'
    },
    address: {
      value: 'address',
      name: 'address',
      width: '150px'
    },
    shopName: {
      type: 'text',
      placeholder: 'Shop Name',
      value: '',
      name: 'shopName',
      minLength: '1',
      maxLength: '120',
      autoComplete: 'off',
      required: true,
      width: '130px',
      height: '28px'
    }
  }
  inputChangedHandler = (e) => {
    const updatedField = updateObject(this.state[e.target.name], { value: e.target.value });
    this.setState({ [e.target.name]: updatedField });
  }
  checkBoxHandler = () => {
    this.setState((prevState) => {
      return { delivery: !prevState.delivery };
    });
  }
  onSelectHandler = (e, type) => {
    let field;
    if(e.target.value === 'add') {
      this.props.addAddressPopup();
      field = updateObject(this.state[type], { value: 'address' });
    } else {
      field = updateObject(this.state[type], { value: e.target.value });
    }
    this.setState({ [type]: field });
  }
  onClear = () => {
    let category = updateObject(this.state.category, { value: 'Category' });
    let address = updateObject(this.state.address, { value: 'address' });
    let shopName = updateObject(this.state.shopName, { value: '' });
    this.setState({ delivery: false, category, address, shopName });
    this.props.unsetFilters();
    this.props.resetPageNumber();
  }
  onOk = () => {
    this.props.resetPageNumber();
    let data = validateFilters(this.state.delivery, this.state.address, this.state.category, this.state.shopName);
    this.props.setFilters(data);
    if(this.props.closed) {
      this.props.closed();
    }
    this.props.fetchShops(data, 1, this.props.pageSize);
  }
  render() {
    let address = [
      { name: 'Address', value: 'address' }
    ];
    if(this.props.address) {
      this.props.address.forEach(add => {
        let formatedAdd = convertAddress(add); 
        address.push({ name: formatedAdd, value: formatedAdd });
      });
    }
    address.push({ name: 'Add New Address', value: 'add' });
    let addSelect = null;
    if(this.props.isAuth) {
      addSelect = (
        <div className={module.Container} >
          {getSelect(this.state.address, address, this.onSelectHandler, 'address')}
        </div>
      );
    }
    return(
      <div className={module.Filters} >
        <div className={module.Container} >
          <span>Search By</span>
        </div>
        <div className={module.Container} >
          <div className={module.CB} >
            <CheckBox 
              onChange={this.checkBoxHandler}
              checked={this.state.delivery}
            />
          </div>
          <span>Delivery</span>
        </div>
        <div className={module.Container} >
          {getSelect(this.state.category, shopCategories, this.onSelectHandler, 'category')}
        </div>
        {addSelect}
        <div className={module.Container} >
          {getInput(this.state.shopName, this.inputChangedHandler)}
        </div>
        <div className={module.Container} >
          <Button width='60px' height='30px' onClick={this.onOk} >OK</Button>
        </div>
        <div className={module.Container} >
          <div className={module.CButton} onClick={this.onClear} >Clear</div>
        </div>
      </div>
    );
  }
}


export default Filters;
