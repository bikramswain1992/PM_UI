import { useState, useEffect } from 'react';
import {setUser} from '../../utility/session';
import {useNavigate} from 'react-router-dom';
import { loginApi, loginViaIdentityProviderApi } from './api';
import {GoogleLogin} from 'react-google-login';
import {gapi} from 'gapi-script';
import Alert from '../common/Alert/Alert';
import Loader from '../common/Loader/Loader';
import { LoginDetails, LoginIdentityProviderDetails, LoginProps } from './types';

import '../../css/popup.scss';
import { AlertProps, AlertType } from '../../utility/globaltypes';

const Login: React.FC<LoginProps> = ({setSignInPopup, setShowLogin, setLoginStatusChange}) => {

  const navigate = useNavigate();

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  useEffect(()=>{
    const initializeGoogleClient = () => {
      gapi.client.init({
        clientId: googleClientId
      });
    };
    gapi.load('client:auth2', initializeGoogleClient);
  },[]);

  const [loginDetails, setLoginDetails] = useState<LoginDetails>({
    email:'',
    password:''
  });

  const [alertDetails, setAlertDetails] = useState<AlertProps>({
    title: '',
    text: '',
    type: AlertType.success,
    show: 0
  });

  const [showLoader, setShowLoader] = useState(false);

  const login = async () => {
    if(!(loginDetails.email && loginDetails.password)){
      setAlertDetails({
        title: '',
        text: 'Email and Password are required.',
        type: AlertType.error,
        show: alertDetails.show+1
      });
      return;
    }
    setShowLoader(true);

    const userDetails = await loginApi(loginDetails);

    if(userDetails.errors){
      setShowLoader(false);
      setAlertDetails({
        title: '',
        text: userDetails.errors.join(','),
        type: AlertType.error,
        show: alertDetails.show+1
      });
      return;
    }

    postLoginActions(userDetails, 'normal');
  }

  const onChange = (e: any) => {
    setLoginDetails({...loginDetails, [e.target.name]:e.target.value});
  }

  const closeLogin = () => {
    setShowLogin(false);
  }

  const googleLoginSuccess = async (res: any) => {
    
    const profile = res.profileObj;
    const loginViaIdentityDetails: LoginIdentityProviderDetails = {
      email: profile.email,
      name: profile.name,
      uniqueId: profile.googleId,
      provider: 'Google'
    };

    setShowLoader(true);
    const userDetails = await loginViaIdentityProviderApi(loginViaIdentityDetails);

    if(userDetails.errors){
      setShowLoader(false);
      setAlertDetails({
        title: '',
        text: userDetails.errors.join(','),
        type: AlertType.error,
        show: alertDetails.show+1
      });
      return;
    }

    postLoginActions(userDetails, 'google');
  }

  const googleLoginError = (err: any) => {
    console.log(err);
  }

  const postLoginActions = (userDetails: any, loginType: string) => {
    setShowLoader(false);
    userDetails['loginType'] = loginType;
    setUser(userDetails);
    setLoginStatusChange(true);
    closeLogin();
    navigate('/mysecrets');
  }

  return (
    <>
      <div className='popup-header'>
        <h4>Login to <span className='text-clr-primary'>SafeSecrets</span></h4>
      </div>
      <div className='popup-body'>
        <div className='input-group-vertical'>
          <label>Email</label>
          <input
            name='email'
            type='text'
            placeholder='abc@xyz.com'
            value={loginDetails.email}
            onChange={onChange} />
        </div>
        <div className='input-group-vertical'>
          <label>Password</label>
          <input
            name='password'
            type='password'
            placeholder='********'
            value={loginDetails.password}
            onChange={onChange} />
        </div>
        <div className='other-login-options'>
          <a className='nav-link text-sm' onClick={() => setSignInPopup('forgotpassword')}>
            Forgot Password?
          </a>
          <GoogleLogin
              clientId={googleClientId}
              buttonText='Sign in with Google'
              onSuccess={googleLoginSuccess}
              onFailure={googleLoginError}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
          />
        </div>
      </div>
      <div className='popup-footer'>
        <div className='btn-container-center'>
          <button className='btn btn-secondary' onClick={closeLogin}>Cancel</button>
          <button className='btn btn-primary' onClick={login}>Login</button>
        </div>
        <a className='nav-link text-sm' onClick={() => setSignInPopup('register')}>
          Don't have account?
        </a>
      </div>
      <Alert title={alertDetails.title} text={alertDetails.text} type={alertDetails.type} show={alertDetails.show} />
      <Loader showLoader={showLoader}/>
    </>
  )
}

export default Login;