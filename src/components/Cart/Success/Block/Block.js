import React from 'react';

import module from './Block.module.css';

const block = (props) => {
  let block = module.Block;
  let bottom = module.Bottom;
  if(props.address) {
    block = module.Block1;
    bottom = module.Bottom1;
  }
  return (
    <div className={block} >
      <div className={module.Top} >
        <div className={module.Icon1} >{props.icon1}</div>
        <div className={module.Text1} >{props.text1}</div>
      </div>
      <div className={bottom} >
        <div className={module.Icon2} >{props.icon2}</div>
        <div className={module.Text2} >{props.text2}</div>
      </div>
    </div>
  );
} 

export default block;