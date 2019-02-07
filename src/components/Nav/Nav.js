import React from 'react';

import module from './Nav.module.css';
import NavItem from './NavItem/NavItem';
import Aux from '../../hoc/Auxx/Auxx';

const nav = (props) => {
  let links = null;
  if(props.isAuthenticated) {
    links = (
      <Aux>
        <NavItem to='/' exact >Home</NavItem>
        <NavItem to='/cart' >Cart</NavItem>
        <NavItem to='/profile' >Profile</NavItem>
        <NavItem to='/auth/logout' >Logout</NavItem>
      </Aux>
    );
  } else {
    links = (
      <Aux>
        <NavItem to='/' exact >Home</NavItem>
        <NavItem to='/auth/signup' >Signup</NavItem>
        <NavItem to='/auth/signin' >Signin</NavItem>
      </Aux>
    );
  }
  return (
      <div className={module.Container} >
          <ul className={module.NavigationItems} >
            {links}
          </ul>
      </div>

  );
}

export default nav;
