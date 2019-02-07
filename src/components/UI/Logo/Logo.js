import React from 'react';

import module from './Logo.module.css';
import Logo from '../../../assets/Img/logo.png';

const logo = () => {
  return (
    <div className={module.Logo} >
      <img src={Logo} alt='Fuse' />
    </div>
  );
}

export default logo;