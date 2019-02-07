import React from 'react';

import module from './Block.module.css';

const block = (props) => {
  return (
    <div className={module.Block} >
      <div className={module.Top} >
        <div className={module.Icon1} >{props.icon1}</div>
        <div className={module.Text1} >{props.text1}</div>
      </div>
      <div className={module.Bottom} >
        <div className={module.Icon2} >{props.icon2}</div>
        <div className={module.Text2} >{props.text2}</div>
      </div>
    </div>
  );
} 

export default block;