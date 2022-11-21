const ApiPath = import.meta.env.VITE_API_PATH;

export const RegisterUserAPI = `${ApiPath}/register-user`;
export const LoginAPI = `${ApiPath}/login`;
export const LoginViaIdentityProviderAPI = `${ApiPath}/login-identityprovider`;
export const DeleteSecretAPI = `${ApiPath}/delete-secret`;
export const GetMySecretsAPI = `${ApiPath}/get-my-secrets`;
export const ReadSecretAPI = `${ApiPath}/read-secret`;
export const ResetPasswordAPI = `${ApiPath}/reset-password/link`;
export const ResetPasswordRequestAPI = `${ApiPath}/reset-password/link/reset`;
export const SetSecretAPI = `${ApiPath}/set-secret`;