import React from 'react';

import module from './MNav.module.css';
import Aux from '../../hoc/Auxx/Auxx';
import MNavItem from './MNavItem/MNavItem';
import HomeIcon from '../UI/Icons/Home/Home';
import UserIcon from '../UI/Icons/User/User';
import CartIcon from '../UI/Icons/Cart/Cart';
import LogoutIcon from '../UI/Icons/Logout/Logout';
import SigninIcon from '../UI/Icons/Signin/Signin';
import SignupIcon from '../UI/Icons/Signup/Signup';

const mNav = (props) => {
  let nav = (
    <Aux>
      <MNavItem  
        to='/auth/signup'
        label='Signup'
        icon={<SignupIcon />}
      />
      <MNavItem  
        to='/'
        label='Home'
        icon={<HomeIcon />}
      />
      <MNavItem  
        to='/auth/signin'
        label='Signin'
        icon={<SigninIcon />}
      />
    </Aux>
  );
  if(props.isAuthenticated) {
    nav = (
      <Aux>
        <MNavItem  
          to='/auth/logout'
          label='Logout'
          icon={<LogoutIcon />}
          isAuth
        />
        <MNavItem  
          to='/profile'
          label='Profile'
          icon={<UserIcon />}
          isAuth
        />
        <MNavItem  
          to='/cart'
          label='Cart'
          icon={<CartIcon />}
          isAuth
        />
        <MNavItem  
          to='/'
          label='Home'
          icon={<HomeIcon />}
          isAuth
        />
      </Aux>
    );
  }
  return (
    <div className={module.MNav} >
      {nav}
    </div>
  );
}

export default mNav;