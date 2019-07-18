import React from 'react';
import { FaBan } from 'react-icons/fa';

import classes from './Ban.module.css';

const Ban = (props) => {
    return (
        <div className={classes.change} >
            <FaBan />
        </div>
    );
}

export default Ban;