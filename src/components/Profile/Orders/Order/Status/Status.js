import React from 'react';
import moment from 'moment';

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
  let delivered = null;
  let accepted = null;
  let cancelled = null;
  let rejected = null;
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
    }
  });
  if(cancelled) {
    delivered = false;
  }
  if(cancelled && !accepted) {
    accepted = false;
    delivered = false;
  }
  if(rejected) {
    accepted = false;
    delivered = false;
  }
  let errorMsg = null;
  if(props.error && props.orderID === props.currID) {
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
  const currTime = new Date().getTime();
  let mininutes = moment(((acceptedTimeStamp + parseInt(props.expirationTime)))).format('m');
  if(accepted && !((acceptedTimeStamp  + parseInt(props.expirationTime)) > currTime)) {
    flag = false;
  }
  let cancel = null;
  if(!cancelled && !rejected && !delivered && flag) {
    cancel = (
      <div className={module.Cancel} >
        <div className={module.CIcon} >
          <CrossIcon onClick={props.cancelOrder} />
        </div>
        <div className={module.CancelText} >
          Cancel Order {accepted ? 'In ' + mininutes + 'min' : null}
        </div>
      </div>
    );
  }

  let acceptedTime = null;
  let canceledTime = null;
  let rejectedTime = null;
  let deliveryTime = null;
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
  let ren = (
    <Aux>
      {errorMsg}
      {cancelMsg}
      <Trackker 
        accepted={accepted}
        delivered={delivered}
      />
      {cancel}
      {deliveryTime}
      {acceptedTime}
      {canceledTime}
      {rejectedTime}
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