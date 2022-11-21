import {useState} from 'react'
import Login from './Login';
import Register from './Register';
import '../../css/loginregister.scss';
import ForgotPassword from './ForgotPassword';
import { LoginRegisterProps } from './types';

const LoginRegister:React.FC<LoginRegisterProps> = ({setShowLogin, setLoginStatusChange}) => {

  const [signInPopup, setSignInPopup] = useState('login');

  const getPopupToDisplay = () => {
    if(signInPopup === 'login'){
      return <Login setSignInPopup={setSignInPopup} setShowLogin={setShowLogin} setLoginStatusChange={setLoginStatusChange}/>;
    }
    if(signInPopup === 'register'){
      return <Register setSignInPopup={setSignInPopup} setShowLogin={setShowLogin}/>
    }
    return <ForgotPassword setSignInPopup={setSignInPopup} />
  }

  return (
    <div className='login_register-content popup'>
      {
        getPopupToDisplay()
      }
    </div>
  )
}

export default LoginRegister