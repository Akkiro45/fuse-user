import React from 'react';

import module from './Item.module.css';
import { awsS3BucketUrl } from '../../../../shared/utility';

const item = (props) => {
  let src = null;
  if(props.src) {
    src = awsS3BucketUrl + props.src;
  }
  let className = [module.Item];
  if(props.active === props.name) className.push(module.Active);
  return (
    <div className={className.join(' ')} onClick={() => props.onClick(props.onClick)} >
      <div className={module.Photo} >
        {/* eslint-disable-next-line */}
        <img src={src} className={module.Img} />
      </div>
      <div className={module.Name} >
        {props.name}
      </div>
    </div>
  )
}

export default item;