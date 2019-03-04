import React from 'react';

import module from './Status.module.css';
import Trackker from './Trackker/Trackker';
import CrossIcon from '../../../../UI/Icons/Cross/Cross';
import Spinner from '../../../../UI/Spinner/Spinner';
import Aux from '../../../../../hoc/Auxx/Auxx';
import TimeLabel from './TimeLabel/TimeLabel';
import DeliveryTimeLabel from './DeliveryTimeLabel/DeliveryTimeLabel';

const Status = (props) => {
  let acceptedTimeStamp = null;
  let canceledTimeStamp = null;
  let deliveryFromTimeStamp = null;
  let deliveryToTimeStamp = null;
  let rejectedTimeStamp = null;
  let deliveredTimeStamp = null;
  let delivered = null;
  let accepted = null;
  let cancelled = null;
  let rejected = null;
  let notdelivered = null;
  props.status.forEach(s => {
    if(s.type === 3) {
      cancelled = true;
      canceledTimeStamp = parseInt(s.timeStamp);
    }
    else if(s.type === 4) {
      accepted = true;
      acceptedTimeStamp = parseInt(s.timeStamp);
      deliveryFromTimeStamp = parseInt(props.deliveryTime.from);
      deliveryToTimeStamp = parseInt(props.deliveryTime.to);
    }
    else if(s.type === 5) {
      rejected = true;
      rejectedTimeStamp = parseInt(s.timeStamp);
    }
    else if(s.type === 6) {
      delivered = true;
      deliveredTimeStamp = parseInt(s.timeStamp);
    }
    else if(s.type === 7) {
      notdelivered = true;
      rejectedTimeStamp = parseInt(s.timeStamp);     
    }
  });
  let trackkerD = null;
  if(delivered) {
    trackkerD = true;
  } 
  if(notdelivered) {
    trackkerD = false;
  }
  if(cancelled) {
    trackkerD = false;
  }
  if(cancelled && !accepted) {
    accepted = false;
    trackkerD = false;
  }
  if(rejected) {
    accepted = false;
    trackkerD = false;
  }
  let errorMsg = null;
  if(props.error && props.orderID === props.currID && !notdelivered) {
    errorMsg = (
      <div className={module.CancelMsg} >
        Unable to Cancel Order!
      </div>
    );
  }
  let cancelMsg = null;
  if(cancelled) {
    cancelMsg = (
      <div className={module.CancelMsg} >
        You Cancelled the Order!
      </div>
    );
  }
  let flag = true;
  if(accepted) {
    if(!props.allowCancelOrder) {
      flag = false;
    }
  }
  let cancel = null;
  if(!cancelled && !rejected && !delivered && flag && !notdelivered) {
    cancel = (
      <div className={module.Cancel} >
        <div className={module.CIcon} >
          <CrossIcon onClick={props.cancelOrder} />
        </div>
        <div className={module.CancelText} >
          Cancel Order 
        </div>
      </div>
    );
  }

  let acceptedTime = null;
  let canceledTime = null;
  let rejectedTime = null;
  let deliveryTime = null;
  let deliveredTime = null;
  if(accepted) {
    acceptedTime = (
      <TimeLabel 
        timeStamp={acceptedTimeStamp}
        label='Accepted At'
      />
    );
    deliveryTime = (
      <DeliveryTimeLabel 
        fromTimeStamp={deliveryFromTimeStamp}
        toTimeStamp={deliveryToTimeStamp}
      />
    );
  }
  if(cancelled) {
    canceledTime = (
      <TimeLabel 
        timeStamp={canceledTimeStamp}
        label='Cancelled At'
      />
    );
  } else if(rejected) {
    rejectedTime = (
      <TimeLabel 
        timeStamp={rejectedTimeStamp}
        label='Rejected At'
      />
    );
  }
  if(delivered) {
    deliveredTime = (
      <TimeLabel 
        timeStamp={deliveredTimeStamp}
        label='Delivered At'
      />
    );
  }
  if(notdelivered) {
    rejectedTime = (
      <TimeLabel 
        timeStamp={rejectedTimeStamp}
        label='Rejected At'
      />
    );
  }
  let ren = (
    <Aux>
      {errorMsg}
      {cancelMsg}
      <Trackker 
        accepted={accepted}
        delivered={trackkerD}
      />
      {cancel}
      {deliveryTime}
      {acceptedTime}
      {canceledTime}
      {rejectedTime}
      {deliveredTime}
    </Aux>
  );
  if(props.loading && props.orderID === props.currID) {
    ren = <Spinner />
  }
  return (
    <div className={module.Status} >
      {ren}
    </div>  
  );
}

export default Status;