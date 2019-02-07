import React from 'react';
import { IoIosCloseCircle } from 'react-icons/io';

import classes from './Cross.module.css';

const cross = (props) => {
    let style = {};
    if(props.nopointer) {
        style.cursor = 'auto';
    }
    return (
        <div className={classes.change} style={style} onClick={props.onClick} >
            <IoIosCloseCircle  />
        </div>
    );
}

export default cross;