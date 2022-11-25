import React from 'react';
import {clearCacheAndRedirect} from '../../utility/session';
import logoutIcon from '../../images/logout.svg';

const UserLogout = () => {

  const userLogout = () => {
    clearCacheAndRedirect();
  }

  return (
    <button className='user-logout-btn'>
      <div className='user-info' onClick={userLogout}>
        <img src={logoutIcon} alt="logout" />
        Logout
      </div>
    </button>
  )
}

export default UserLogout;