import React, { useEffect, useState } from 'react';
import { getUser } from '../../utility/session';
import { User } from '../../utility/globaltypes';
import UserGoogleLogout from './UserGoogleLogout';
import UserLogout from './UserLogout';
import { HeaderProps } from './types';
import { useNavigate } from 'react-router-dom';
import '../../css/header.scss';
import logo from '../../images/Logo.svg';
import userIcon from '../../images/user.svg';
import badgeIcon from '../../images/badge.svg';
import mailIcon from '../../images/mail.svg';
import profileIcon from '../../images/profile.svg';

const Header: React.FC<HeaderProps> = ({ setShowLogin, loginStatusChange }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<(User | undefined)>(getUser());
  const [userName, setUserName] = useState({
    name: '',
    initials: '',
  });
  const [showUserDetails, setShowUserDetails] = useState(false);

  useEffect(() => {
    setUser(getUser());
  }, [loginStatusChange]);

  const trimUser = () => {
    const userNames = user?.name.split(' ');
    if (userNames) {
      setUserName({
        name: userNames[0],
        initials: userNames[0].substring(0, 2).toUpperCase(),
      });
    }
  };

  useEffect(() => {
    trimUser();
  }, [user]);

  const loginButtonClick = () => {
    setShowLogin(true);
  };

  const showHideUserDetails = () => {
    setShowUserDetails((prev) => !prev);
  };

  const editUserProfile = () => {
    showHideUserDetails();
    navigate('/userprofile');
  };

  const getUserOrLogin = () => {
    if (user) {
      return (
        <div className="user-container">
          <div className="user-icon-content" onClick={showHideUserDetails}>
            <img src={userIcon} alt="User" />
            <div className="user-name">{userName.name}</div>
          </div>
          {
            showUserDetails
              ? (
                <div className="user-details">
                  <div className="user-info-list">
                    <div className="user-info" title={user.name}>
                      <img src={badgeIcon} alt="name" />
                      <span>{user.name}</span>
                    </div>
                    <div className="user-info" title={user.email}>
                      <img src={mailIcon} alt="email" />
                      <span>{user.email}</span>
                    </div>
                    <div className="user-info update-profile" title="Update profile" onClick={editUserProfile}>
                      <img src={profileIcon} alt="email" />
                      <span>Update profile</span>
                    </div>
                    {
                  user.loginType === 'normal'
                    ? <UserLogout />
                    : <UserGoogleLogout />
                }
                  </div>
                </div>
              )
              : <div />
          }
        </div>
      );
    }

    return <button className="btn btn-primary-fade" onClick={loginButtonClick}>Login</button>;
  };

  return (
    <header className="site-header">
      <div className="header-content">
        <div className="logo">
          <img className="logo-img" src={logo} alt="Logo" />
        </div>
        <div className="user-login">
          {getUserOrLogin()}
        </div>
      </div>
    </header>
  );
};

export default Header;
