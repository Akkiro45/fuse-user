import React from 'react';

import module from './SocialLinkLabel.module.css';

const linkLabel = (props) => {
  return (
    <div className={module.Label} >
      <div className={module.Icon} >{props.icon}</div>
      <div className={module.Text} >@{props.text}</div>
    </div>
  );
}

export default linkLabel;