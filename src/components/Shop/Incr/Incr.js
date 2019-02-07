import React from 'react';

import module from './Incr.module.css';

const incr = (props) => {
  let style = {};
  let style1 = {};
  if(props.marginTop) {
    style.marginTop = props.marginTop;
    style1.paddingTop = props.marginTop;
  }
  return (
    <div className={module.Incr} >
      <div className={module.Sub} style={style} onClick={props.onDec} >-</div>
      <div className={module.Value} >
        <div className={module.V} style={style1} >
          {props.value}
        </div>
      </div>
      <div className={module.Add} style={style} onClick={props.onInc} >+</div>
    </div>
  );
}

export default incr;