import React, { Component } from 'react';

import module from './Confirmation.module.css';
import RightArrow from '../../UI/Icons/RightArrow/RightArrow';
import { capatalize } from '../../../shared/utility';
import Summary from '../Summary/Summary';
import Button from '../../UI/Button/Button';
import ErrorHandler from '../../../hoc/ErrorHandler/ErrorHandler';
import Addresses from '../Addresses/Addresses';
import AddAddress from '../AddAddress/AddAddress';
import { convertAddress } from '../../../shared/utility';

class Confirmation extends Component {
  state = {
    showAddresses: false,
    showAddAddress: false,
    address: null,
    error: false
  }
  onSelectAdd = (address) => {
    this.setState({ address, showAddresses: false });
  } 
  onClickAddresses = () => {
    this.setState(prevState => {
      return { showAddresses: !prevState.showAddresses, error: false };
    });
  }
  onClickAddAddress = () => {
    this.setState(prevState => {
      return { showAddAddress: !prevState.showAddAddress, error: false };
    });
  }
  onPlaceOrder = () => {
    if(this.state.address) {
      this.props.onPlaceOrder(this.state.address)
    } else {
      this.setState({ error: true });
    }
  }
  render() {
    const subTotal = this.props.subTotal;
    const deliveryCharge = this.props.deliveryCharge;
    const total = parseInt(this.props.subTotal) + parseInt(this.props.deliveryCharge);
    let address = (
      <div className={module.NoAddMsg} >
        Please Select Delivery Address!
      </div>
    );
    if(this.state.address) {
      address = (
        <div className={module.AddressC} >
          <div className={module.AddressT} >
            {convertAddress(this.state.address)}
          </div>
        </div>
      );
    }
    let errorMsg = null;
    if(this.state.error) {
      errorMsg = (
        <div className={module.NoAddMsg} >
          Please Select Delivery Address!
        </div>
      );
    }
    let show = null;
    if(this.state.showAddAddress) {
      show = <AddAddress 
        off={this.onClickAddAddress}
      />
    }
    if(this.state.showAddresses) {
      show = (
        <Addresses 
          address={this.props.address}
          onSelectAdd={this.onSelectAdd}
        />
      );
    }
    let popup = null;
    if(this.state.showAddAddress || this.state.showAddresses) {
      popup = (
        <ErrorHandler 
          error={show}
          errorConformedhandler={this.state.showAddAddress ? this.onClickAddAddress : this.onClickAddresses}
        />
      );
    }
    return (
      <div className={module.Confirmation} >
        {popup}
        <div className={module.PInfo} >
          <div className={module.TitleBox} >
            <div className={module.Left} >
              <RightArrow color='#2874ff' />
            </div>
            <div className={module.Right} >
              Personal Information
            </div>
          </div>
          <div className={module.Info} >
            <div>{capatalize(this.props.firstName)} {capatalize(this.props.lastName)}</div>
            <div>{this.props.phoneNumber}</div>
          </div>
        </div>
        <hr />
        <div className={module.Address} >
          <div className={module.TitleBox} >
            <div className={module.Left} >
              <RightArrow color='#2874ff' />
            </div>
            <div className={module.Right} >
              Delivery Address
            </div>   
          </div>
          {address}
          <div className={module.Buttons} >
            <div className={module.SAdd} >
              <Button bradius='4px' onClick={this.onClickAddresses} >Select Address</Button>
            </div>
            <div className={module.AAdd} >
              <Button bradius='4px' onClick={this.onClickAddAddress} >Add New Address</Button>
            </div>
          </div>
        </div>
        <hr />
        <div className={module.Payment} >
          <div className={module.TitleBox} >
            <div className={module.Left} >
              <RightArrow color='#2874ff' />
            </div>
            <div className={module.Right} >
              Payment
            </div>
          </div>
          <Summary 
            subTotal={subTotal}
            deliveryCharge={deliveryCharge}
            total={total}
          />
          <div className={module.Msg} >
            Please Pay <span>Rs. {total}</span> to delivery person when your delivery arrived.
          </div>
          {errorMsg}
          <div className={module.Button} >
            <Button bradius='4px' onClick={this.onPlaceOrder} >Place Order</Button>
          </div>
        </div>
      </div>
    );
  }
} 

export default Confirmation;