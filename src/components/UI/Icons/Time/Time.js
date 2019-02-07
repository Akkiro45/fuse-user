import React from 'react';
import { MdSchedule } from 'react-icons/md';

import classes from './Time.module.css';

const Time = () => {
    return (
        <div className={classes.change}>
            <MdSchedule />
        </div>
    );
}

export default Time;