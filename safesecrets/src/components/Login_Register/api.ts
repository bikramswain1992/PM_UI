import {
  LoginAPI, RegisterUserAPI, ResetPasswordRequestAPI, LoginViaIdentityProviderAPI,
} from '../../utility/passwordmanagerapis';
import handleApiResponse from '../../utility/apiErrorHandler';
import { LoginDetails, LoginIdentityProviderDetails, RegisterDetails } from './types';

export const loginApi = async (loginDetails: LoginDetails) => {
  const userDetails = await fetch(LoginAPI, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    body: JSON.stringify(loginDetails),
  })
    .then((resp) => handleApiResponse(resp))
    .catch((err) => handleApiResponse(err));

  return userDetails;
};

export const loginViaIdentityProviderApi = async (loginDetails: LoginIdentityProviderDetails) => {
  const userDetails = await fetch(LoginViaIdentityProviderAPI, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    body: JSON.stringify(loginDetails),
  })
    .then((resp) => handleApiResponse(resp))
    .catch((err) => handleApiResponse(err));

  return userDetails;
};

export const registerUserApi = async (registerDetails: RegisterDetails) => {
  const registerResponse = await fetch(RegisterUserAPI, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    body: JSON.stringify(registerDetails),
  })
    .then((resp) => handleApiResponse(resp))
    .catch((err) => handleApiResponse(err));

  return registerResponse;
};

export const resetPasswordRequestApi = async (email: string) => {
  const resetRequestResponse = await fetch(ResetPasswordRequestAPI, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    body: JSON.stringify({ email }),
  })
    .then((resp) => handleApiResponse(resp))
    .catch((err) => handleApiResponse(err));

  return resetRequestResponse;
};
