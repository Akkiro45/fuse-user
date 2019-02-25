import React from 'react';
import { MdCancel } from 'react-icons/md';

import classes from './Cross.module.css';

const cross = (props) => {
    let style = {};
    if(props.nopointer) {
        style.cursor = 'auto';
    }
    return (
        <div className={classes.change} style={style} onClick={props.onClick} >
            <MdCancel  />
        </div>
    );
}

export default cross;