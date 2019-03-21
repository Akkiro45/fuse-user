import React from 'react';
import { MdRemoveShoppingCart } from 'react-icons/md';

import classes from './OS.module.css';

const os = () => {
    return (
        <div className={classes.change} >
            <MdRemoveShoppingCart />
        </div>
    );
}

export default os;