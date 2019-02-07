import React from 'react';

import module from './Label.module.css';

const label = (props) => {
  let style = {};
  if(props.width) style.width = props.width;
  return (
    <div className={module.Label}  >
      {props.children}
    </div>
  );
} 

export default label;