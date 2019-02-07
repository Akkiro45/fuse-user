import React from 'react';

import module from './Input.module.css';

const input = (props) => {
  let style = {};
  if(props.height) style.height = props.height;
  if(props.width) style.width = props.width;
  return (
    <input
      className={module.Input}
      style={style}
      type={props.type} 
      placeholder={props.placeholder} 
      value={props.value}
      onChange={props.onChange}
      name={props.name}
      minLength={props.minLength}
      maxLength={props.maxLength}
      required={props.required}
      autoComplete={props.autoComplete}
    />
  );
}

export default input;