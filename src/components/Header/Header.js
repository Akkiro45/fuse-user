import React from 'react';

import module from './Header.module.css';
import Nav from '../Nav/Nav';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const header = (props) => {
  let toogleButton = null;
  if(props.type === 'home' && !props.error) {
    toogleButton = (
      <div className={module.ToggleButton} >
        <DrawerToggle clicked={props.openSideDrawerHandler} />
      </div>
    );
  }
  return (
    <div className={module.Header} >
      <div className={module.Container} >
        {toogleButton}
        <div className={module.Fuse} >
          Fuse
        </div>
        <div className={module.Nav} >
          <Nav isAuthenticated={props.isAuthenticated} />
        </div>
      </div>
    </div>
  );
}

export default header;