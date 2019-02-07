import React from 'react';

import module from './Select.module.css';

const select = (props) => {
  let style = {};
  if(props.height) style.height = props.height;
  if(props.width) style.width = props.width;
  let className = null;
  className = module.Select;
  let options = null;
  if(props.options) {
    options = props.options.map((option, i) => {
      return <option key={i} value={option.value} >{option.name}</option>
    }); 
  }
  return (
    <select style={style} className={className} value={props.value} name={props.name} onChange={props.onChange} >
      {options}
    </select>
  );
}

export default select;