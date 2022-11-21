import { useState } from 'react'
import { resetPasswordRequestApi } from './api';
import { ForgotPasswordProps } from './types';

const ForgotPassword: React.FC<ForgotPasswordProps> = ({setSignInPopup}) => {

  const [email, setEmail] = useState('');
  const [isResetSuccess, setIsResetSuccess] = useState(false);

  const resetPasswordRequest = async () => {
    if(!email){
      alert("Email is required.");
      return;
    }
    const resetRequestResponse = await resetPasswordRequestApi(email);

    if(resetRequestResponse.errors){
      if(resetRequestResponse.type.toLowerCase() === 'notfound'){
        alert('Email is not registered with SafeSecrets');
        return;
      }
      alert(resetRequestResponse.errors.join(','));
      return;
    }

    setIsResetSuccess(true);
  }

  return (
    <>
      <div className="popup-header">
        <h4>Reset password for <span className='text-clr-primary'>SafeSecrets</span></h4>
      </div>
      <div className="popup-body">
        {
          !isResetSuccess
          ?
          <div className='input-group-vertical'>
            <label>Email</label>
            <input
              name='email'
              type="text"
              placeholder='abc@xyz.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </div>
          :
          <div className="reset-message">
            Password reset link has been sent to your email.
          </div>
        }
      </div>
      <div className="popup-footer">
        {
          !isResetSuccess
          ?
          <div className="btn-container-center">
            <button className='btn btn-primary' onClick={resetPasswordRequest}>Reset</button>
          </div>
          :
          <></>
        }
        <a className="nav-link text-sm" onClick={() => setSignInPopup('login')}>
          Back to login
        </a>
      </div>
    </>
  )
}

export default ForgotPassword;