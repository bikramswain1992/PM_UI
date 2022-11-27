import React, { useEffect, useState } from 'react';
import { AlertProps, AlertType } from '../../utility/globaltypes';
import Alert from '../common/Alert/Alert';
import Loader from '../common/Loader/Loader';
import { resetPasswordApi } from './api';
import { ResetPasswordDetails } from './types';

const ResetPassword = () => {
  const [resetPasswordDetails, setResetPasswordResetDetails] = useState<ResetPasswordDetails>({
    email: '',
    password: '',
    link:''
  });
  const [isResetSuccess, setIsResetSuccess] = useState(false);

  const [alertDetails, setAlertDetails] = useState<AlertProps>({
    title: '',
    text: '',
    type: AlertType.success,
    show: 0
  });

  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const link = window.location.href.split('/');
    setResetPasswordResetDetails({...resetPasswordDetails, link: link[link.length-1]});
  },[]);

  const onChange = (e: any) => {
    setResetPasswordResetDetails({...resetPasswordDetails, [e.target.name]:e.target.value});
  }

  const resetPassword = async () => {
    if(!(resetPasswordDetails.email 
      && resetPasswordDetails.password 
      && resetPasswordDetails.link)){
        setAlertDetails({
          title: '',
          text: 'All fields are required',
          type: AlertType.error,
          show: alertDetails.show+1
        });
        return;
    }

    const regex = RegExp('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*?])');
    if(!regex.test(resetPasswordDetails.password)){
      setAlertDetails({
        title: '',
        text: 'Password should contain atleast one lower case alphabet, one upper case  alphabet, one number, one special character (-+_!@#$%^&*?) and should be atleast 8 characters long.',
        type: AlertType.error,
        show: alertDetails.show+1
      });
      return;
    }

    setShowLoader(true);
    const resetPasswordResponse = await resetPasswordApi(resetPasswordDetails);
    setShowLoader(false);

    if(resetPasswordResponse.errors){
      setAlertDetails({
        title: '',
        text: resetPasswordResponse.errors.join(','),
        type: AlertType.error,
        show: alertDetails.show+1
      });
      return;
    }

    setIsResetSuccess(true);
  }

  return (
    <>
      {
        !isResetSuccess
        ?
        <>
          <div className='input-group-vertical'>
            <label>Email</label>
            <input
              name='email'
              type='text'
              placeholder='abc@xyz.com'
              value={resetPasswordDetails.email}
              onChange={onChange} />
          </div>
          <div className='input-group-vertical'>
            <label>New Password</label>
            <input
              name='password'
              type='password'
              placeholder='********'
              value={resetPasswordDetails.password}
              onChange={onChange} />
          </div>
          <div className='btn-container-center'>
            <button className='btn btn-primary' onClick={resetPassword}>Submit</button>
          </div>
        </>
        :
        <div style={{marginTop: '2rem'}}>
          Your password has been changed successfully!
        </div>
      }
      <Alert title={alertDetails.title} text={alertDetails.text} type={alertDetails.type} show={alertDetails.show} />
      <Loader showLoader={showLoader}/>
    </>
  )
}

export default ResetPassword;