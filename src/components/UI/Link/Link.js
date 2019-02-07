import React from 'react';
import { NavLink } from 'react-router-dom';

import module from './Link.module.css';

const link = (props) =>{
  let className = props.remove ? module.Link : module.Style;
  if(props.blue) className = module.Blue
  return (
    <NavLink 
      to={props.to} 
      exact={props.exact} 
      className={ className }
    >
      {props.children}
    </NavLink>
  );
}

export default link;