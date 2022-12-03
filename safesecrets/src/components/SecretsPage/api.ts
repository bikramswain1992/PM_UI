import {
  DeleteSecretAPI, GetMySecretsAPI, ReadSecretAPI, SetSecretAPI,
} from '../../utility/passwordmanagerapis';
import handleApiResponse from '../../utility/apiErrorHandler';
import { MySecrets } from './types';

export const getMySecretsApi = async (token: string | undefined) => {
  const mySecrets = await fetch(GetMySecretsAPI, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    redirect: 'follow',
  }).then((resp) => handleApiResponse(resp))
    .catch((err) => handleApiResponse(err));

  return mySecrets;
};

export const saveMySecretsApi = async (secret: MySecrets, token: string) => {
  const saveResponse = await fetch(SetSecretAPI, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    redirect: 'follow',
    body: JSON.stringify(secret),
  }).then((resp) => handleApiResponse(resp))
    .catch((err) => handleApiResponse(err));

  return saveResponse;
};

export const readSecretApi = async (id: string, token: string) => {
  const readResponse = await fetch(ReadSecretAPI, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    redirect: 'follow',
    body: JSON.stringify({ secretId: id }),
  }).then((resp) => handleApiResponse(resp))
    .catch((err) => handleApiResponse(err));

  return readResponse;
};

export const deleteSecretApi = async (id: string, token: string) => {
  const deleteResponse = await fetch(DeleteSecretAPI, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    redirect: 'follow',
    body: JSON.stringify({ secretId: id }),
  }).then((resp) => handleApiResponse(resp))
    .catch((err) => handleApiResponse(err));

  return deleteResponse;
};
