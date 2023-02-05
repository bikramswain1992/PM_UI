/* eslint-disable no-unused-vars */
export type LoginDetails = {
  email: string,
  password: string
}

export type LoginIdentityProviderDetails = {
  email: string,
  name: string,
  uniqueId: string,
  provider: string
}

export type RegisterDetails = {
  id: string,
  name: string,
  email: string,
  country: string,
  phone: number | string,
  password: string
}

export type GoogleLoginCredential = {
  email: string,
  name: string,
  sub: string
}

export interface LoginRegisterProps {
  setShowLogin: (e: boolean) => void,
  setLoginStatusChange: (e: boolean) => void,
  popupType: string,
  setPopupType: (e: string) => void
}

export interface RegisterProps {
  setSignInPopup: (e: string) => void,
  setShowLogin: (e: boolean) => void
}

export interface LoginProps {
  setSignInPopup: (e: string) => void,
  setShowLogin: (e: boolean) => void,
  setLoginStatusChange: (e: boolean) => void
}

export interface ForgotPasswordProps {
  setSignInPopup: (e: string) => void
}
