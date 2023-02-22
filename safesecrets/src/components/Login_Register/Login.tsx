import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Loader from '../common/Loader/Loader';
import { setUser } from '../../utility/session';
import { loginApi, loginViaIdentityProviderApi } from './api';
import { User } from '../../utility/globaltypes';
import {
  LoginDetails, LoginIdentityProviderDetails, LoginProps, GoogleLoginCredential,
} from './types';

import '../../css/popup.scss';

const Login: React.FC<LoginProps> = ({ setSignInPopup, setShowLogin, setLoginStatusChange }) => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const [loginDetails, setLoginDetails] = useState<LoginDetails>({
    email: '',
    password: '',
  });
  const [showLoader, setShowLoader] = useState(false);
  const googleSignInBtn = useRef<HTMLDivElement>(null);

  const closeLogin = () => {
    setShowLogin(false);
    setSignInPopup('login');
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

  const handleSubmit = (e: any) => {
    // e.preventDefault();
    if (e.keyCode === 13) {
      login();
    }
  };

  const onChange = (e: any) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const googleLoginSuccess = async (res: any) => {
    const profile = jwtDecode(res.credential) as GoogleLoginCredential;
    const loginViaIdentityDetails: LoginIdentityProviderDetails = {
      email: profile.email,
      name: profile.name,
      uniqueId: profile.sub,
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

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: googleClientId,
      callback: googleLoginSuccess,

    });

    if (googleSignInBtn.current) {
      google.accounts.id.renderButton(
        googleSignInBtn.current,
        { theme: 'outline', size: 'large', type: 'standard' },
      );
    }
    // google.accounts.id.prompt();
  }, []);

  return (
    <>
      <div className="popup-header">
        <h4>
          Login to&nbsp;
          <span className="text-clr-primary"><strong>SafeSecrets</strong></span>
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
            onKeyDown={handleSubmit}
          />
        </div>
        <div className="other-login-options">
          <a className="nav-link text-sm" onClick={() => setSignInPopup('forgotpassword')}>
            Forgot Password?
          </a>
          <div id="googleSignInBtn" ref={googleSignInBtn} className="btn-container-center" />
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
