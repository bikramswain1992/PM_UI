import { useState } from 'react';
import {setUser} from '../../utility/user';
import {useNavigate} from 'react-router-dom';
import '../../css/popup.scss';
import { loginApi } from './api';

export interface LoginDetails {
  email: string,
  password: string
}

const Login= ({setSignInPopup, setShowLogin, setLoginStatusChange}) => {

  const navigate = useNavigate();

  const [loginDetails, setLoginDetails] = useState<LoginDetails>({
    email:'',
    password:''
  });

  const login = async () => {
    if(!(loginDetails.email && loginDetails.password)){
      alert("Email and Password are required");
      return;
    }
    const userDetails = await loginApi(loginDetails);

    if(userDetails.errors){
      alert(userDetails.errors.join(','));
      return;
    }

    setUser(userDetails);
    setLoginStatusChange(true);
    closeLogin();
    navigate('/mysecrets');
  }

  const onChange = (e: any) => {
    setLoginDetails({...loginDetails, [e.target.name]:e.target.value});
  }

  const closeLogin = () => {
    setShowLogin(false);
  }

  return (
    <>
      <div className="popup-header">
        <h4>Login to <span className='text-clr-primary'>SafeSecrets</span></h4>
      </div>
      <div className="popup-body">
        <div className='input-group-vertical'>
          <label>Email</label>
          <input
            name='email'
            type="text"
            placeholder='abc@xyz.com'
            value={loginDetails.email}
            onChange={onChange} />
        </div>
        <div className='input-group-vertical'>
          <label>Password</label>
          <input
            name='password'
            type="password"
            placeholder='********'
            value={loginDetails.password}
            onChange={onChange} />
        </div>
        <div className="other-login-options">
          <a className="nav-link text-sm" onClick={() => setSignInPopup('forgotpassword')}>
            Forgot Password?
          </a>
        </div>
      </div>
      <div className="popup-footer">
        <div className="btn-container-center">
          <button className='btn btn-secondary' onClick={closeLogin}>Cancel</button>
          <button className='btn btn-primary' onClick={login}>Login</button>
        </div>
        <a className="nav-link text-sm" onClick={() => setSignInPopup('register')}>
          Don't have account?
        </a>
      </div>
    </>
  )
}

export default Login;