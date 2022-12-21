/* eslint-disable no-unused-vars */
export type Profile = {
  id: string,
  email: string,
  name: string,
  country?: string,
  phone?: string,
  role?: string,
  isEmailVerified?: boolean,
  isPhoneVerified?: boolean
}

export type ProfileUpdate = {
  name: string,
  country: string,
  phone: string,
}

export interface VerifyContactProps {
  showVerification: (e: boolean) => void,
  verifyContact: (e: string) => void
}
