import { ResetPasswordAPI } from "../../utility/passwordmanagerapis";
import { ResetPasswordDetails } from "./types";

export const resetPasswordApi = async (resetPasswordDetails: ResetPasswordDetails) => {
  const resetRequestResponse = await fetch(ResetPasswordAPI, {
    method: 'POST',
    mode: 'cors',
    headers:{
      "Content-Type": "application/json"
    },
    redirect: 'follow',
    body: JSON.stringify(resetPasswordDetails)
  })
  .then(resp => resp.json())
  .catch(err => err.json());

  return resetRequestResponse;
}