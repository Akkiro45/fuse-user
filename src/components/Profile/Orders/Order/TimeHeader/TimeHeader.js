import React from 'react';

import module from './TimeHeader.module.css';
import TimeIcon from '../../../../UI/Icons/Time/Time';
import { dateTimeFormate } from '../../../../../shared/utility';

const timeHeader = (props) => {
  return (
    <div className={module.Time} >
      <div className={module.TimeIcon} >
        <TimeIcon />
      </div>
      <div className={module.TimeText} >
        {dateTimeFormate(props.timeStamp)}
      </div>
    </div>
  );
}

export default timeHeader;