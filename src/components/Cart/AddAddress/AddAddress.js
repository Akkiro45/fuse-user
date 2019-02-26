import React, { Component } from 'react';
import { connect } from 'react-redux';

import module from './AddAddress.module.css';
import { getRInput, getRSelect, updateObject, getDistrictsOptions } from '../../../shared/utility';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';
import * as actions from '../../../store/actions/index';
import { states } from '../../../shared/options';

class AddAddress extends Component {
  state = {
    data: {
      streetAdd: {
        type: 'text',
        placeholder: 'Street Address',
        value: '',
        name: 'streetAdd',
        minLength: '1',
        maxLength: '400',
        required: true,
        fontsize: '16px',
        bradius: '4px'
      },
      landmark: {
        type: 'text',
        placeholder: 'Landmark',
        value: '',
        name: 'landmark',
        minLength: '1',
        maxLength: '200',
        required: true,
        fontsize: '16px',
        bradius: '4px'
      },
      pincode: {
        type: 'tel',
        placeholder: 'Pincode',
        value: '',
        name: 'pincode',
        minLength: '6',
        maxLength: '6',
        required: true,
        fontsize: '16px',
        bradius: '4px'
      },
      state: {
        value: 'state*',
        name: 'state',
        type: 3,
        bradius: '4px'
      },
      district: {
        value: 'district*',
        name: 'district',
        bradius: '4px'
      }
    },
    districtsOp: [
      { name: 'district*', value: 'district*' }
    ]
  }
  onSelectHandler = (e, type) => {
    let field;
    field = updateObject(this.state.data[type], { value: e.target.value });
    let data = updateObject(this.state.data, { [type]: field });
    let districtsOp = this.state.districtsOp;
    let district;
    if(type === 'state') {
      district = updateObject(this.state.data.district, { value: 'district*' });
      if(e.target.value !== 'state*') {
        districtsOp = getDistrictsOptions(e.target.value);
      } else {
        districtsOp = [
          { name: 'district*', value: 'district*' }
        ];
      }
    }
    if(type === 'state') {
      data = updateObject(data, { district });
    }
    this.setState({ data, districtsOp });
  }
  inputChangeHandler = (e) => {
    const updatedField = updateObject(this.state.data[e.target.name], { value: e.target.value });
    const updateData = updateObject(this.state.data, { [e.target.name]: updatedField });
    this.setState({ data: updateData });
    this.props.addressOpClearError();
  }
  shouldComponentUpdate(nextProps) {
    if(nextProps.success) {
      this.props.addressOpClearError();
      this.props.off();
    }
    return true;
  }
  render() {
    let inputs = Object.keys(this.state.data).map(field => {
      if(field === 'state') {
        return (
          <div className={module.Select} key={field} >
            {getRSelect(this.state.data[field], states, this.onSelectHandler, 'state')}
          </div>
        )
      } else if(field === 'district') {
        return (
          <div className={module.Select} key={field} >
            {getRSelect(this.state.data[field], this.state.districtsOp, this.onSelectHandler, 'district')}
          </div>
        )
      } else {
        return (
          <div className={module.Input} key={field} >
            {getRInput(this.state.data[field], this.inputChangeHandler)}
          </div>
        );
      }
    });
    let error = null;
    if(this.props.error) {
      error = (
        <div className={module.Error} >
          {this.props.error}
        </div>
      );
    }
    let ren = (
      <div>
        {error}
        <div className={module.Inputs} >
          {inputs}
        </div>
        <div className={module.Button} >
          <Button bradius='4px' onClick={() => this.props.addAddress(this.props.token, this.state.data)} >
            Add Address
          </Button>
        </div>
      </div>
    );
    if(this.props.loading) {
      ren = (
        <Spinner />
      );
    }
    return (
      <div className={module.AddAddress} >
        <div className={module.Header} >
          Add New Address
        </div>
        {ren}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    loading: state.auth.addressLoading,
    error: state.auth.addressError,
    success: state.auth.addressOp
  }
}
const mapDispatchToProps = dispacth => {
  return {
    addAddress: (token, address) => dispacth(actions.addAddress(token, address)),
    addressOpClearError: () => dispacth(actions.addressOpClearError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAddress);