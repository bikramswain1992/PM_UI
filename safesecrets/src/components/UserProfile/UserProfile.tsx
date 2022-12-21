/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import Loader from '../common/Loader/Loader';
import Popup from '../common/popup/Popup';
import VerifyContact from './VerifyContact';
import CountryList from '../../assets/countryList.json';
import { clearCacheAndRedirect, getUser } from '../../utility/session';
import {
  getMyProfileApi, initiateContactVerificationApi, updateUserProfileApi, verifyContactApi,
} from './api';
import { Profile } from './types';
import '../../css/userprofile.scss';

const UserProfile = () => {
  const MySwal = withReactContent(Swal);
  const user = useMemo(() => getUser(), []);
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState<Profile>({
    id: '',
    email: '',
    name: '',
    country: '',
    phone: '',
    role: '',
    isEmailVerified: false,
    isPhoneVerified: false,
  });
  const [showVerifyContact, setShowVerifyContact] = useState(false);

  const [showLoader, setShowLoader] = useState(false);

  const getMyProfile = async () => {
    setShowLoader(true);
    const getMyProfileResponse = await getMyProfileApi(user?.token);
    setShowLoader(false);

    if (getMyProfileResponse.errors) {
      MySwal.fire({
        text: getMyProfileResponse.errors.join(','),
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }

    setUserProfile(getMyProfileResponse);
  };

  useEffect(() => {
    if (!user) {
      clearCacheAndRedirect();
    } else {
      getMyProfile();
    }
  }, [user]);

  const onChange = (e: any) => {
    setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
  };

  const goBack = () => {
    navigate(-1);
  };

  const updateProfile = async () => {
    if (!(userProfile.name
      && userProfile.country
      && userProfile.phone)) {
      MySwal.fire({
        text: 'All fields are required',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }

    setShowLoader(true);
    const profileUpdateResponse = await updateUserProfileApi(
      { name: userProfile.name, country: userProfile.country, phone: userProfile.phone },
      user?.token,
    );
    setShowLoader(false);

    if (profileUpdateResponse.errors) {
      MySwal.fire({
        text: profileUpdateResponse.errors.join(','),
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }

    MySwal.fire({
      text: 'Profile successfully updated',
      icon: 'success',
      confirmButtonText: 'Ok',
    });
  };

  const initiateContactVerification = async (type: string) => {
    setShowLoader(true);
    const initiateContactVerificationResponse = await initiateContactVerificationApi(type, user?.token);
    setShowLoader(false);

    if (initiateContactVerificationResponse.errors) {
      MySwal.fire({
        text: initiateContactVerificationResponse.errors.join(','),
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }
    setShowVerifyContact(true);
  };

  const verifyContact = async (verificationCode: string) => {
    setShowLoader(true);
    const verifyContactResponse = await verifyContactApi(verificationCode, user?.token);
    setShowLoader(false);

    if (verifyContactResponse.errors) {
      MySwal.fire({
        text: verifyContactResponse.errors.join(','),
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }
    setUserProfile({ ...userProfile, isEmailVerified: true });
    setShowVerifyContact(false);
  };

  return (
    <div className="user-profile-details">
      <div className="user-profile-header">
        My details
      </div>
      <div className="user-profile-body">
        <div className="input-group-flexible profile-email">
          <label htmlFor="name">Email</label>
          <span className="text-italic nav-link profile-email">{userProfile.email}</span>
          {
            userProfile.isEmailVerified
              ? <span className="text-sm text-italic clr-success verification-status">Verified</span>
              : <span className="text-sm text-italic clr-danger verification-status" onClick={() => initiateContactVerification('Email')}>Un-verified</span>
          }
        </div>
        <div className="input-group-flexible">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Full name"
            value={userProfile.name}
            onChange={onChange}
          />
        </div>
        <div className="input-group-flexible">
          <label htmlFor="name">Country</label>
          <select
            id="country"
            name="country"
            placeholder="USA, UK, India"
            value={userProfile.country}
            defaultValue="null"
            onChange={onChange}
          >
            {
              CountryList.map((x) => <option key={x.name} value={x.value}>{`${x.name} (${x.value})`}</option>)
            }
          </select>
        </div>
        <div className="input-group-flexible">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            type="number"
            placeholder="9999999999"
            value={userProfile.phone}
            onChange={onChange}
          />
        </div>
      </div>
      <div className="user-profile-footer">
        <div className="btn-container-center">
          <button className="btn btn-secondary" onClick={goBack}>Back</button>
          <button className="btn btn-primary" onClick={updateProfile}>Update</button>
        </div>
      </div>
      {
        showVerifyContact
          ? (
            <Popup>
              <VerifyContact
                showVerification={setShowVerifyContact}
                verifyContact={verifyContact}
              />
            </Popup>
          )
          : <div />
      }
      <Loader showLoader={showLoader} />
    </div>
  );
};

export default UserProfile;
