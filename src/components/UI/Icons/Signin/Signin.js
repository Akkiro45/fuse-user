import React from 'react';
import { GoSignIn } from 'react-icons/go';

import classes from './Signin.module.css';

const Signin = () => {
    return (
        <div className={classes.change}>
            <GoSignIn />
        </div>
    );
}

export default Signin;