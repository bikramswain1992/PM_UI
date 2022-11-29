import {useEffect, useState} from 'react';
import { getUser, clearCacheAndRedirect} from '../../utility/session';
import {User} from '../../utility/globaltypes';
import UserGoogleLogout from './UserGoogleLogout';
import UserLogout from './UserLogout';
import '../../css/header.scss';
import logo from '../../images/logo.svg';
import userIcon from '../../images/user.svg';
import badgeIcon from '../../images/badge.svg';
import mailIcon from '../../images/mail.svg';
import { HeaderProps } from './types';

const Header: React.FC<HeaderProps> = ({setShowLogin, loginStatusChange}) => {

  const[user, setUser] = useState<(User | undefined)>(getUser());
  const [userName, setUserName] = useState({
    name: '',
    initials: ''
  });
  const [showUserDetails, setShowUserDetails] = useState(false);
  
  useEffect(() => {
    setUser(getUser());
  },[loginStatusChange]);

  useEffect(() => {
    trimUser();
  },[user])

  const loginButtonClick = () =>{
    setShowLogin(true);
  }

  const trimUser = () => {
    const userNames = user?.name.split(' ');
    if(userNames){
      setUserName({
        name: userNames[0],
        initials: userNames[0].substring(0,2).toUpperCase()
      });
    }
  }

  const showHideUserDetails = () => {
    setShowUserDetails(prev => !prev);
  }

  const getUserOrLogin = () => {
    if(user){
      return <>
        <div className='user-container'>
          <div className='user-icon-content' onClick={showHideUserDetails}>
            <img src={userIcon} alt='User' />
            <div className='user-name'>{userName.name}</div>
          </div>
          {
            showUserDetails
            ?
            <div className='user-details'>
              <div className='user-info-list'>
                <div className='user-info' title={user.name}>
                  <img src={badgeIcon} alt='name' />
                  {user.name}
                </div>
                <div className='user-info' title={user.email}>
                  <img src={mailIcon} alt='email' />
                  {user.email}
                </div>
                {
                  user.loginType === 'normal'
                  ?
                  <UserLogout />
                  :
                  <UserGoogleLogout />
                }
              </div>
            </div>
            :
            <></>
          }
        </div>
      </>;
    }

    return <button className='btn btn-primary-fade' onClick={loginButtonClick}>Login/Register</button>;
  }

  return (
    <header className='bg-white site-header'>
      <div className='header-content'>
        <div className='logo'>
          <img className='logo-img' src={logo} alt='Logo' />
        </div>
        <div className='user-login'>
          {getUserOrLogin()}
        </div>
      </div>
    </header>
  )
}

export default Header;