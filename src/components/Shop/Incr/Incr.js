import React from 'react';

import module from './Incr.module.css';

const incr = (props) => {
  return (
    <div className={module.Incr}>
      <div className={module.Sub} onClick={props.onDec} >
          -
      </div>
      <div className={module.Value} >
        {props.value}
      </div>
      <div className={module.Add} onClick={props.onInc} >
        +
      </div>
    </div>
  );
}

export default incr;