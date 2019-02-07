import React from 'react';

import module from './Trackker.module.css';
import CheckIcon from '../../../../../UI/Icons/Check/Check';
import CrossIcon from '../../../../../UI/Icons/Cross/Cross';

const trackker = (props) => {
  let accepted = null;
  let delivered = null;
  if(props.accepted === true) {
    accepted = <CheckIcon />
  } else if(props.accepted === false ) {
    accepted = <CrossIcon nopointer />
  }
  if(props.delivered === true) {
    delivered = <CheckIcon />
  } else if(props.delivered === false ) {
    delivered = <CrossIcon nopointer />
  }
  return (
    <div className={module.Trackker} >
      <div className={module.Icons} >
        <div className={module.IconC} >
          <div className={module.Icon} >
            <CheckIcon />
          </div>
          <div className={module.Text} > 
            Ordered
          </div>
        </div>

        <div className={module.Space} >
          <div className={module.Line} ></div>
        </div>

        <div className={module.IconC} >
          <div className={module.Icon} >
            {accepted}
          </div>
          <div className={module.Text} >
            Accepted
          </div>
        </div>

        <div className={module.Space} >
          <div className={module.Line} ></div>
        </div>

        <div className={module.IconC} >
          <div className={module.Icon} >
            {delivered}
          </div>
          <div className={module.Text} >
            Delivered
          </div>
        </div>
      </div>
    </div>
  );
}

export default trackker;