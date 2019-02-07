import React from 'react';

import module from './TimeLabel.module.css';
import { dateTimeFormate } from '../../../../../../shared/utility';

const timeLabel = (props) => {
  return (
    <div className={module.TimeLabel} >
      <span className={module.Label} >
        {props.label}
      </span>
      <span className={module.Time} >
        {dateTimeFormate(props.timeStamp)}
      </span>
    </div>
  );
}

export default timeLabel;