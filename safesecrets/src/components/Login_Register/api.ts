import { LoginAPI, RegisterUserAPI, ResetPasswordRequestAPI, LoginViaIdentityProviderAPI } from '../../utility/passwordmanagerapis';
import {LoginDetails, LoginIdentityProviderDetails} from './types';
import { RegisterDetails } from './Register';

export const loginApi = async (loginDetails: LoginDetails) => {
  const userDetails = await fetch(LoginAPI, {
    method: 'POST',
    mode: 'cors',
    headers:{
      "Content-Type": "application/json"
    },
    redirect: 'follow',
    body: JSON.stringify(loginDetails)
  })
  .then(resp => resp.json())
  .catch(err => err.json());

  return userDetails;
}

export const loginViaIdentityProviderApi = async(loginDetails: LoginIdentityProviderDetails) => {
  const userDetails = await fetch(LoginViaIdentityProviderAPI, {
    method: 'POST',
    mode: 'cors',
    headers:{
      "Content-Type": "application/json"
    },
    redirect: 'follow',
    body: JSON.stringify(loginDetails)
  })
  .then(resp => resp.json())
  .catch(err => err.json());

  return userDetails;
}

export const registerUserApi = async (registerDetails: RegisterDetails) => {
  const registerResponse = await fetch(RegisterUserAPI, {
    method: 'POST',
    mode: 'cors',
    headers:{
      "Content-Type": "application/json"
    },
    redirect: 'follow',
    body: JSON.stringify(registerDetails)
  })
  .then(resp => resp.json())
  .catch(err => err.json());

  return registerResponse;
}

export const resetPasswordRequestApi = async (email: string) => {
  const resetRequestResponse = await fetch(ResetPasswordRequestAPI, {
    method: 'POST',
    mode: 'cors',
    headers:{
      "Content-Type": "application/json"
    },
    redirect: 'follow',
    body: JSON.stringify({email})
  })
  .then(resp => resp.json())
  .catch(err => err.json());

  return resetRequestResponse;
}
