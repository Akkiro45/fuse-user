import React from 'react';

import module from './UserProfile.module.css';
import UserIcon from '../../UI/Icons/User/User';

const userProfile = (props) => {
  return (
    <div className={module.UserProfile} >
      <div className={module.Icon} >
        <div className={module.UserIcon} >
          <UserIcon  />
        </div>
      </div>
      <div className={module.Info} >
        <div className={module.Name} >
          {props.name}
        </div>
        <div className={module.RInfo} >
          {props.phoneNumber}
        </div>
        <div className={module.RInfo} >
          {props.email}
        </div>
      </div>
    </div>
  );
}

export default userProfile;