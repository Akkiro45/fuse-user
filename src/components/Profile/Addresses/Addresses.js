import React from 'react';

import module from './Addresses.module.css';
import AddIcon from '../../UI/Icons/Add/Add';
import Address from './Address/Address';
import ErrorHandler from '../../../hoc/ErrorHandler/ErrorHandler';
import AddAddress from '../../Cart/AddAddress/AddAddress';

const addresses = (props) => {
  let address = null;
  if(props.addrs.length === 0) {
    address = (
      <div className={module.EmptyMsg} >
        You have no saved Addresses!
      </div>
    );
  } else {
    address = props.addrs.map((adr, i) => {
      return (
        <Address 
          key={i}
          address={adr}
        />
      );
    });
  }
  let addAddress = null;
  if(props.show) {
    addAddress = (
      <ErrorHandler 
        error={<AddAddress off={props.onAddAddressClick} />}
        errorConformedhandler={props.onAddAddressClick}
      />
    );
  }
  return (
    <div className={module.Addrs} >
      <div className={module.AddB} onClick={props.onAddAddressClick} >
        <div className={module.AddIcon} >
          <AddIcon />
        </div>
        <div className={module.AddText} >
          Add New Address
        </div>
      </div>
      {address}
      {addAddress}
    </div>
  );
}

export default addresses;