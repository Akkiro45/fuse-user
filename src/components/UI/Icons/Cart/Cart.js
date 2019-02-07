import React from 'react';
import { IoMdCart } from 'react-icons/io';

import classes from './Cart.module.css';

const Cart = () => {
    return (
        <div className={classes.change}>
            <IoMdCart />
        </div>
    );
}

export default Cart;