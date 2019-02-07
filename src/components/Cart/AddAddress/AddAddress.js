import React, { Component } from 'react';
import { connect } from 'react-redux';

import module from './AddAddress.module.css';
import { getRInput, updateObject } from '../../../shared/utility';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';
import * as actions from '../../../store/actions/index';

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
        fontsize: '16px'
      },
      landmark: {
        type: 'text',
        placeholder: 'Landmark',
        value: '',
        name: 'landmark',
        minLength: '1',
        maxLength: '200',
        required: true,
        fontsize: '16px'
      },
      city: {
        type: 'text',
        placeholder: 'City',
        value: '',
        name: 'city',
        minLength: '1',
        maxLength: '200',
        required: true,
        fontsize: '16px'
      },
      pincode: {
        type: 'tel',
        placeholder: 'Pincode',
        value: '',
        name: 'pincode',
        minLength: '6',
        maxLength: '6',
        required: true,
        fontsize: '16px'
      },
      state: {
        type: 'text',
        placeholder: 'State',
        value: '',
        name: 'state',
        minLength: '1',
        maxLength: '200',
        required: true,
        fontsize: '16px'
      },
      country: {
        type: 'text',
        placeholder: 'Country',
        value: 'India',
        name: 'country',
        minLength: '1',
        maxLength: '300',
        required: true,
        fontsize: '16px'
      }
    }
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
    // if(this.props.success) {
    //   this.props.addressOpClearError();
    //   this.props.off();
    // }
    let inputs = Object.keys(this.state.data).map(field => {
      return (
        <div className={module.Input} key={field} >
          {getRInput(this.state.data[field], this.inputChangeHandler)}
        </div>
      )
    })
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
          <Button onClick={() => this.props.addAddress(this.props.token, this.state.data)} >
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