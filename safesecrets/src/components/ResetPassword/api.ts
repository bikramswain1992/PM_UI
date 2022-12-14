import { ResetPasswordAPI } from '../../utility/passwordmanagerapis';
import handleApiResponse from '../../utility/apiErrorHandler';
import { ResetPasswordDetails } from './types';

const resetPasswordApi = async (resetPasswordDetails: ResetPasswordDetails) => {
  const resetRequestResponse = await fetch(ResetPasswordAPI, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    body: JSON.stringify(resetPasswordDetails),
  })
    .then((resp) => handleApiResponse(resp))
    .catch((err) => handleApiResponse(err));
  return resetRequestResponse;
};

export default resetPasswordApi;
