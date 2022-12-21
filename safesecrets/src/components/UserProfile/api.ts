/* eslint-disable max-len */
import handleApiResponse from '../../utility/apiErrorHandler';
import {
  GetMyProfileAPI, UpdateUserProfileAPI, InitiateContactVerificationAPI, VerifyContactAPI,
} from '../../utility/passwordmanagerapis';
import { ProfileUpdate } from './types';

export const getMyProfileApi = async (token: string | undefined) => {
  const myProfile = await fetch(GetMyProfileAPI, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    redirect: 'follow',
  }).then((resp) => handleApiResponse(resp))
    .catch((err) => handleApiResponse(err));

  return myProfile;
};

export const updateUserProfileApi = async (profile: ProfileUpdate, token: string | undefined) => {
  const updateResponse = await fetch(UpdateUserProfileAPI, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    redirect: 'follow',
    body: JSON.stringify(profile),
  }).then((resp) => handleApiResponse(resp))
    .catch((err) => handleApiResponse(err));

  return updateResponse;
};

export const initiateContactVerificationApi = async (type: string, token: string | undefined) => {
  const initiateVerificationResponse = await fetch(InitiateContactVerificationAPI, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    redirect: 'follow',
    body: JSON.stringify({ type }),
  }).then((resp) => handleApiResponse(resp))
    .catch((err) => handleApiResponse(err));

  return initiateVerificationResponse;
};

export const verifyContactApi = async (verificationCode: string, token: string | undefined) => {
  const verifyResponse = await fetch(VerifyContactAPI, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    redirect: 'follow',
    body: JSON.stringify({ verificationCode }),
  }).then((resp) => handleApiResponse(resp))
    .catch((err) => handleApiResponse(err));

  return verifyResponse;
};
