import React from 'react';
import { IoIosPin } from 'react-icons/io';

import classes from './Loc.module.css';

const loc = () => {
    return (
        <div className={classes.change} >
            <IoIosPin />
        </div>
    );
}

export default loc;