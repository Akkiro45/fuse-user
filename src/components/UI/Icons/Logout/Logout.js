import React from 'react';
// import { FaPowerOff } from 'react-icons/fa';
import { GoSignOut } from 'react-icons/go';

import classes from './Logout.module.css';

const Logout = () => {
    return (
        <div className={classes.change}>
            <GoSignOut />
        </div>
    );
}

export default Logout;