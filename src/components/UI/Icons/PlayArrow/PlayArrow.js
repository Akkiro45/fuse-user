import React from 'react';
import { FaPlay } from 'react-icons/fa';

import classes from './PlayArrow.module.css';

const DeliveryRun = () => {
    return (
        <div className={classes.change}>
            <FaPlay />
        </div>
    );
}

export default DeliveryRun;