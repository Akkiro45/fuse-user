import React from 'react';

import module from './Add.module.css';

const add = () => {
  return (
    <div className={module.Add} >
      <div className={module.Msg1} >
        Make your shop online with Fuse for FREE!
      </div>
      <div className={module.Msg2} >
        Visit <a target='_' href={'https://www.shop.thefuse.in/'} >https://www.shop.thefuse.in</a> for more Infomation.
      </div>
    </div>
  );
}

export default add;