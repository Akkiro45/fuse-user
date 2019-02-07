import React from 'react';
import { MdVerifiedUser } from 'react-icons/md';

import classes from './Verified.module.css';

const verified = () => {
    return (
        <div className={classes.change} >
            <MdVerifiedUser />
        </div>
    );
}

export default verified;