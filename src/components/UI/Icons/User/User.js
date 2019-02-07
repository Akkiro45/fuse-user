import React from 'react';
import { FaUser } from 'react-icons/fa';

import classes from './User.module.css';

const User = () => {
    return (
        <div className={classes.change}>
            <FaUser />
        </div>
    );
}

export default User;