/* eslint-disable prefer-const */
import { SafeSecretSession, Secret, User } from './globaltypes';

export const getSafeSecretsSession = () : SafeSecretSession => {
  const ss = JSON.parse(sessionStorage.getItem('ss')!);
  if (!ss) {
    return {};
  }
  return ss;
};

export const setSafeSecretSession = (ss: SafeSecretSession) =>{
  sessionStorage.setItem('ss', JSON.stringify(ss));
};

export const getUser = () : (User | undefined) => {
  const ss = getSafeSecretsSession();
  const user = ss.usr;

  return user;
};

export const setUser = (user: User) => {
  let ss = getSafeSecretsSession();
  ss.usr = user;
  setSafeSecretSession(ss);
};

export const getViewedSecrets = () : (Secret[] | undefined) => {
  const ss = getSafeSecretsSession();
  if (ss.secrets) {
    return JSON.parse(atob(ss.secrets));
  }
  return undefined;
};

export const getViewedSecret = (id: string) : (Secret | undefined) => {
  const secrets = getViewedSecrets();
  const secret = secrets?.filter((x) => x.id === id)[0];
  return secret;
};

export const setViewedSecrets = (secret: Secret) => {
  const secrets = getViewedSecrets();
  let otherSecrets = secrets?.filter(x => x.id !== secret.id);
  if (otherSecrets) {
    otherSecrets.push(secret);
  } else {
    otherSecrets = [secret];
  }
  const newSecrets = [...otherSecrets!];

  let ss = getSafeSecretsSession();
  ss.secrets = btoa(JSON.stringify(newSecrets));
  setSafeSecretSession(ss);
};

export const setViewedSecretsWithDelete = (id: string) => {
  const secrets = getViewedSecrets();
  const otherSecrets = secrets?.filter((x) => x.id !== id);
  if (otherSecrets) {
    let ss = getSafeSecretsSession();
    ss.secrets = btoa(JSON.stringify(otherSecrets));
    setSafeSecretSession(ss);
  }
};

export const clearCacheAndRedirect = () => {
  sessionStorage.removeItem('ss');
  window.location.href = '/';
};
