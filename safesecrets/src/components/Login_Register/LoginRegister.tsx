import React from 'react';
import Login from './Login';
import Register from './Register';
import Popup from '../common/popup/Popup';
import ForgotPassword from './ForgotPassword';
import { LoginRegisterProps } from './types';
import '../../css/loginregister.scss';

const LoginRegister:React.FC<LoginRegisterProps> = (
  {
    setShowLogin, setLoginStatusChange, popupType, setPopupType,
  },
) => {
  const getPopupToDisplay = () => {
    if (popupType === 'login') {
      return (
        <Login
          setSignInPopup={setPopupType}
          setShowLogin={setShowLogin}
          setLoginStatusChange={setLoginStatusChange}
        />
      );
    }
    if (popupType === 'register') {
      return <Register setSignInPopup={setPopupType} setShowLogin={setShowLogin} />;
    }
    return <ForgotPassword setSignInPopup={setPopupType} />;
  };

  return (
    <Popup>
      {
        getPopupToDisplay()
      }
    </Popup>
  );
};

export default LoginRegister;
