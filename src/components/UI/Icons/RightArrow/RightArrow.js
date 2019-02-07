import React from 'react';
import { FaChevronRight } from 'react-icons/fa';

import classes from './RightArrow.module.css';

const RightArrow = (props) => {
    let style = {};
    if(props.color) style.color = props.color;
    return (
        <div className={classes.change} style={style} >
            <FaChevronRight  />
        </div>
    );
}

export default RightArrow;