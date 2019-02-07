import React from 'react';
import { FaFilter } from 'react-icons/fa';

import classes from './Filter.module.css';

const Filter = () => {
    return (
        <div className={classes.change}>
            <FaFilter />
        </div>
    );
}

export default Filter;