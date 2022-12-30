import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Loader from '../common/Loader/Loader';
import { resetPasswordRequestApi } from './api';
import { ForgotPasswordProps } from './types';

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ setSignInPopup }) => {
  const MySwal = withReactContent(Swal);

  const [email, setEmail] = useState('');
  const [isResetSuccess, setIsResetSuccess] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const resetPasswordRequest = async () => {
    if (!email) {
      MySwal.fire({
        text: 'Email is required.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }

    setShowLoader(true);
    const resetRequestResponse = await resetPasswordRequestApi(email);
    setShowLoader(false);

    if (resetRequestResponse.errors) {
      if (resetRequestResponse.type.toLowerCase() === 'notfound') {
        MySwal.fire({
          text: 'Email is not registered with SafeSecrets',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
        return;
      }
      return;
    }

    setIsResetSuccess(true);
  };

  return (
    <>
      <div className="popup-header">
        <h4>
          Reset password for&nbsp;
          <span className="text-clr-primary"><strong>SafeSecrets</strong></span>
        </h4>
      </div>
      <div className="popup-body">
        {
          !isResetSuccess
            ? (
              <div className="input-group-vertical">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="abc@xyz.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            )
            : (
              <div className="reset-message">
                Password reset link has been sent to your email.
              </div>
            )
        }
      </div>
      <div className="popup-footer">
        {
          !isResetSuccess
            ? (
              <div className="btn-container-center">
                <button className="btn btn-primary" onClick={resetPasswordRequest}>Reset</button>
              </div>
            )
            : <div />
        }
        <a className="nav-link text-sm" onClick={() => setSignInPopup('login')}>
          Back to login
        </a>
      </div>
      <Loader showLoader={showLoader} />
    </>
  );
};

export default ForgotPassword;
