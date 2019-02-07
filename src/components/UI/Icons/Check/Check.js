import React from 'react';
import { IoMdCheckmarkCircle } from 'react-icons/io';

import classes from './Check.module.css';

const check = () => {
    return (
        <div className={classes.change}>
            <IoMdCheckmarkCircle />
        </div>
    );
}

export default check;