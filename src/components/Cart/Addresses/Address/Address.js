import React from 'react';

import module from './Address.module.css';
import { convertAddress } from '../../../../shared/utility';
import Button from '../../../UI/Button/Button';

const adddress = (props) => {
  return (
    <div className={module.Address} >
      <div className={module.Add} >
        {convertAddress(props.address)}
      </div>
      <div className={module.Button} >
        <div className={module.Btn} >
          <Button onClick={props.onSelectAdd} >Here</Button>
        </div>
      </div>
    </div>
  );
}

export default adddress;