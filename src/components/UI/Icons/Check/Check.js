import React from 'react';
import { MdCheckCircle } from 'react-icons/md';

import classes from './Check.module.css';

const check = () => {
    return (
        <div className={classes.change}>
            <MdCheckCircle />
        </div>
    );
}

export default check;