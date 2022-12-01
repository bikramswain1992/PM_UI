import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { clearCacheAndRedirect } from '../../utility/session';
import logoutIcon from '../../images/logout.svg';

const UserGoogleLogout = () => {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const userLogout = () => {
    clearCacheAndRedirect();
  };

  return (
    <GoogleLogout
      clientId={googleClientId}
      icon={false}
      onLogoutSuccess={userLogout}
      className="google-logout-btn"
    >
      <div className="user-info" onClick={userLogout}>
        <img src={logoutIcon} alt="logout" />
        Logout
      </div>
    </GoogleLogout>
  );
};

export default UserGoogleLogout;
