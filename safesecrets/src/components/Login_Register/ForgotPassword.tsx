import { useState } from 'react';
import { AlertProps, AlertType } from '../../utility/globaltypes';
import Alert from '../common/Alert/Alert';
import Loader from '../common/Loader/Loader';
import { resetPasswordRequestApi } from './api';
import { ForgotPasswordProps } from './types';

const ForgotPassword: React.FC<ForgotPasswordProps> = ({setSignInPopup}) => {

  const [email, setEmail] = useState('');
  const [isResetSuccess, setIsResetSuccess] = useState(false);

  const [alertDetails, setAlertDetails] = useState<AlertProps>({
    title: '',
    text: '',
    type: AlertType.success,
    show: 0
  });

  const [showLoader, setShowLoader] = useState(false);

  const resetPasswordRequest = async () => {
    if(!email){
      setAlertDetails({
        title: '',
        text: 'Email is required.',
        type: AlertType.error,
        show: alertDetails.show+1
      });
      return;
    }

    setShowLoader(true);
    const resetRequestResponse = await resetPasswordRequestApi(email);
    setShowLoader(false);
    
    if(resetRequestResponse.errors){
      if(resetRequestResponse.type.toLowerCase() === 'notfound'){
        setAlertDetails({
          title: '',
          text: 'Email is not registered with SafeSecrets',
          type: AlertType.error,
          show: alertDetails.show+1
        });
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
      <Alert title={alertDetails.title} text={alertDetails.text} type={alertDetails.type} show={alertDetails.show} />
      <Loader showLoader={showLoader}/>
    </>
  )
}

export default ForgotPassword;