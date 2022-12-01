import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Loader from '../common/Loader/Loader';
import { setUser } from '../../utility/session';
import { loginApi, loginViaIdentityProviderApi } from './api';
import { User } from '../../utility/globaltypes';
import { LoginDetails, LoginIdentityProviderDetails, LoginProps } from './types';

import '../../css/popup.scss';

const Login: React.FC<LoginProps> = ({ setSignInPopup, setShowLogin, setLoginStatusChange }) => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  useEffect(() => {
    const initializeGoogleClient = () => {
      gapi.client.init({
        clientId: googleClientId,
      });
    };
    gapi.load('client:auth2', initializeGoogleClient);
  }, []);

  const [loginDetails, setLoginDetails] = useState<LoginDetails>({
    email: '',
    password: '',
  });
  const [showLoader, setShowLoader] = useState(false);

  const closeLogin = () => {
    setShowLogin(false);
  };

  const postLoginActions = (userDetails: any, loginType: string) => {
    const user = userDetails as User;
    user.loginType = loginType;
    setUser(user);
    setLoginStatusChange(true);
    closeLogin();
    navigate('/mysecrets');
  };

  const login = async () => {
    if (!(loginDetails.email && loginDetails.password)) {
      MySwal.fire({
        text: 'Email and Password are required.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }
    setShowLoader(true);

    const userDetails = await loginApi(loginDetails);
    setShowLoader(false);

    if (userDetails.errors) {
      MySwal.fire({
        text: userDetails.errors.join(','),
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }

    postLoginActions(userDetails, 'normal');
  };

  const onChange = (e: any) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const googleLoginSuccess = async (res: any) => {
    const profile = res.profileObj;
    const loginViaIdentityDetails: LoginIdentityProviderDetails = {
      email: profile.email,
      name: profile.name,
      uniqueId: profile.googleId,
      provider: 'Google',
    };

    setShowLoader(true);
    const userDetails = await loginViaIdentityProviderApi(loginViaIdentityDetails);
    setShowLoader(false);

    if (userDetails.errors) {
      MySwal.fire({
        text: userDetails.errors.join(','),
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }

    postLoginActions(userDetails, 'google');
  };

  const googleLoginError = (err: any) => {
    if (err.details) {
      MySwal.fire({
        text: err.details,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };

  return (
    <>
      <div className="popup-header">
        <h4>
          Login to
          <span className="text-clr-primary">SafeSecrets</span>
        </h4>
      </div>
      <div className="popup-body">
        <div className="input-group-vertical">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="abc@xyz.com"
            value={loginDetails.email}
            onChange={onChange}
          />
        </div>
        <div className="input-group-vertical">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            value={loginDetails.password}
            onChange={onChange}
          />
        </div>
        <div className="other-login-options">
          <a className="nav-link text-sm" onClick={() => setSignInPopup('forgotpassword')}>
            Forgot Password?
          </a>
          <GoogleLogin
            clientId={googleClientId}
            buttonText="Sign in with Google"
            onSuccess={googleLoginSuccess}
            onFailure={googleLoginError}
            cookiePolicy="single_host_origin"
            isSignedIn
          />
        </div>
      </div>
      <div className="popup-footer">
        <div className="btn-container-center">
          <button className="btn btn-secondary" onClick={closeLogin}>Cancel</button>
          <button className="btn btn-primary" onClick={login}>Login</button>
        </div>
        <a className="nav-link text-sm" onClick={() => setSignInPopup('register')}>
          Don&apos;t have account?
        </a>
      </div>
      <Loader showLoader={showLoader} />
    </>
  );
};

export default Login;
