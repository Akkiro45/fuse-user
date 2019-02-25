import React from 'react';
import { withRouter } from 'react-router-dom';

import module from './MNavItem.module.css';

const onClick = (e, props) => {
  props.history.replace(props.to);
}
const navItem = (props) => {
  let className = module.isNotAuth;
  if(props.isAuth) className = module.isAuth;
  let className1 = module.Container;
  if(props.to === props.history.location.pathname) {
    className1 = module.Active;
  }
  return (
    <div className={className} onClick={(e) => onClick(e, props)}>
      <div className={className1} >
        <div className={module.Icon} >{props.icon}</div>
        <div className={module.Label} >{props.label}</div>
      </div>
    </div>
  );
}

export default withRouter(navItem);