import React from 'react';
import { MdReceipt } from 'react-icons/md';

import classes from './List.module.css';

const list = () => {
    return (
        <div className={classes.change} >
            <MdReceipt />
        </div>
    );
}

export default list;