import React  from 'react';

import module from './Addresses.module.css';
import Address from './Address/Address';

const addresses = (props) => {
  let adds = null;
  adds = props.address.map((ad, i) => {
    return (
      <Address 
        key={i}
        address={ad}
        onSelectAdd={() => props.onSelectAdd(ad)}
      />
    );
  });
  if(adds.length === 0) {
    adds = (
      <div className={module.ErrorMsg} >
        Please Add New Address
      </div>
    );
  }
  return (
    <div className={module.Adds} >
      <div className={module.Msg} >
        Deliver To
      </div>
      <div className={module.Addresses} >
        {adds}
      </div>
    </div>
  );
}

export default addresses;