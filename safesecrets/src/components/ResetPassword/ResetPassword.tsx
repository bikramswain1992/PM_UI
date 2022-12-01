import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Loader from '../common/Loader/Loader';
import resetPasswordApi from './api';
import { ResetPasswordDetails } from './types';

const ResetPassword = () => {
  const MySwal = withReactContent(Swal);

  const [resetPasswordDetails, setResetPasswordResetDetails] = useState<ResetPasswordDetails>({
    email: '',
    password: '',
    link: '',
  });
  const [isResetSuccess, setIsResetSuccess] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const link = window.location.href.split('/');
    setResetPasswordResetDetails({ ...resetPasswordDetails, link: link[link.length - 1] });
  }, []);

  const onChange = (e: any) => {
    setResetPasswordResetDetails({ ...resetPasswordDetails, [e.target.name]: e.target.value });
  };

  const resetPassword = async () => {
    if (!(resetPasswordDetails.email
      && resetPasswordDetails.password
      && resetPasswordDetails.link)) {
      MySwal.fire({
        text: 'All fields are required',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }

    const regex = /(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*?])/;
    if (!regex.test(resetPasswordDetails.password)) {
      MySwal.fire({
        text: 'Password should contain atleast one lower case alphabet, one upper case  alphabet, one number, one special character (-+_!@#$%^&*?) and should be atleast 8 characters long.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }

    setShowLoader(true);
    const resetPasswordResponse = await resetPasswordApi(resetPasswordDetails);
    setShowLoader(false);

    if (resetPasswordResponse.errors) {
      MySwal.fire({
        text: resetPasswordResponse.errors.join(','),
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }

    setIsResetSuccess(true);
  };

  return (
    <>
      {
        !isResetSuccess
          ? (
            <>
              <div className="input-group-vertical">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="abc@xyz.com"
                  value={resetPasswordDetails.email}
                  onChange={onChange}
                />
              </div>
              <div className="input-group-vertical">
                <label htmlFor="newPassword">New Password</label>
                <input
                  id="newPassword"
                  name="password"
                  type="password"
                  placeholder="********"
                  value={resetPasswordDetails.password}
                  onChange={onChange}
                />
              </div>
              <div className="btn-container-center">
                <button className="btn btn-primary" onClick={resetPassword}>Submit</button>
              </div>
            </>
          )
          : (
            <div style={{ marginTop: '2rem' }}>
              Your password has been changed successfully!
            </div>
          )
      }
      <Loader showLoader={showLoader} />
    </>
  );
};

export default ResetPassword;
