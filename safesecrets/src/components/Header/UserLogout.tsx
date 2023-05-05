import React from 'react';
import { useNavigate } from 'react-router-dom';
import { clearCacheAndRedirect } from '../../utility/session';
import logoutIcon from '../../images/logout.svg';

const UserLogout = () => {
  const navigate = useNavigate();

  const userLogout = () => {
    navigate(0);
    clearCacheAndRedirect();
  };

  return (
    <button className="user-logout-btn">
      <div className="user-info" onClick={userLogout}>
        <img src={logoutIcon} alt="logout" />
        Logout
      </div>
    </button>
  );
};

export default UserLogout;
