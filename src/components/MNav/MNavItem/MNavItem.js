import React from 'react';
import { NavLink } from 'react-router-dom';

import module from './MNavItem.module.css';

const navItem = (props) => {
  let className = module.isNotAuth;
  if(props.isAuth) className = module.isAuth;
  return (
    <div className={className} >
      <NavLink to={props.to} exact activeClassName={module.active}  >
        <div>
          <div className={module.Icon} >{props.icon}</div>
          <div className={module.Label} >{props.label}</div>
        </div>
      </NavLink>
    </div>
  );
}

export default navItem;