import React from 'react';

import classes from './DrawerToggle.module.css';
import FilterIcon from '../../UI/Icons/Filter/Filter';

const drawerToggle = (props) => (
  <div  className={classes.DrawerToggle} onClick={props.clicked} >
    <FilterIcon />
  </div>
);

export default drawerToggle;