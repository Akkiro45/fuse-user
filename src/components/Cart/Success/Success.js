import React from 'react';

import module from './Success.module.css';
import CheckIcon from '../../UI/Icons/Check/Check';
import ListIcon from '../../UI/Icons/List/List';
import VerifiedIcon from '../../UI/Icons/Verified/Verified';
import LocIcon from '../../UI/Icons/Loc/Loc';
import RightArrowIcon from '../../UI/Icons/RightArrow/RightArrow';
import Block from './Block/Block';
import Button from '../../UI/Button/Button';
import { convertAddress } from '../../../shared/utility';

const success = (props) => {
  let amt = `Rs. ${props.total}`;
  return (
    <div className={module.Success} >
      <div className={module.Top} >
        <div className={module.Icon} >
          <CheckIcon />
        </div>
        <div className={module.Text} >Order Placed Successfully</div>
      </div>
      <hr />
      <div className={module.Container} >
        <Block 
          icon1={<ListIcon />}
          icon2={<RightArrowIcon color='#006989' />}
          text1='Total Amount'
          text2={amt}
        />
        <hr />
        <Block 
          icon1={<VerifiedIcon />}
          icon2={<RightArrowIcon color='#006989' />}
          text1='Payment'
          text2='Cash on Delivry'
        />
        <hr />
        <Block 
          icon1={<LocIcon />}
          icon2={<RightArrowIcon color='#006989' />}
          text1='Delivery Address'
          text2={convertAddress(props.address)}
        />
      </div>
      <div className={module.Buttons} >
        <div className={module.StatusB} >
          <Button onClick={() => props.onRedirect('status')} >Check Order Status</Button>
        </div>
        <div className={module.ContinueB} >
          <Button onClick={() => props.onRedirect('home')} >Continue Shopping</Button>
        </div>
      </div>
    </div>
  );
}

export default success;