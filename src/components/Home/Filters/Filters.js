import React, { Component } from 'react';

import module from './Filters.module.css';
import CheckBox from '../../UI/CheckBox/CheckBox';
import Button from '../../UI/FormButton/Button';
import { shopCategories } from '../../../shared/options';
import { getInput, getSelect, updateObject, validateFilters } from '../../../shared/utility';
import List from './List/List';
import Aux from '../../../hoc/Auxx/Auxx';
import DownArrowIcon from '../../UI/Icons/DownArrow/DownArrow';

class Filters extends Component {
  state = {
    delivery: false,
    category: {
      value: 'Category*',
      name: 'shopCategories',
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
    },
    district: 'District',
    showD: false
  }
  setDistrict = (district) => {
    this.setState({ district });
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
    field = updateObject(this.state[type], { value: e.target.value });
    this.setState({ [type]: field });
  }
  onClear = () => {
    let category = updateObject(this.state.category, { value: 'Category*' });
    let shopName = updateObject(this.state.shopName, { value: '' });
    this.setState({ delivery: false, category, district: 'District', shopName });
    this.props.unsetFilters();
    this.props.resetPageNumber();
  }
  onOk = () => {
    this.props.resetPageNumber();
    let data = validateFilters(this.state.delivery, this.state.district, this.state.category, this.state.shopName);
    this.props.setFilters(data);
    if(this.props.closed) {
      this.props.closed();
    }
    this.props.fetchShops(data, 1, this.props.pageSize);
  }
  toggleShowd = () => {
    this.setState(prevState => {
      return { showD: !prevState.showD };
    });
  }
  render() {
    let ren = null;
    if(this.state.showD) {
      ren = (
        <List 
          toggleShowd={this.toggleShowd}
          setDistrict={this.setDistrict}
        />
      );
    } else {
      ren = (
        <Aux>
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
          <div className={module.Container} >
            <div className={module.District} onClick={this.toggleShowd} >
              <div className={module.DistrictT} >
                {this.state.district}
              </div>
              <div className={module.DistrictI} >
                <DownArrowIcon />
              </div>
            </div>
          </div>
          <div className={module.Container} >
            {getInput(this.state.shopName, this.inputChangedHandler)}
          </div>
          <div className={module.Container} >
            <Button width='60px' height='30px' onClick={this.onOk} >OK</Button>
          </div>
          <div className={module.Container} >
            <div className={module.CButton} onClick={this.onClear} >Clear</div>
          </div>
        </Aux>
      );
    }
    return (
      <div className={module.Filters} >
        {ren}
      </div>
    );
  }
}


export default Filters;
