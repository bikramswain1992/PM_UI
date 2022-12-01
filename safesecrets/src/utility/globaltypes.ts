export type User = {
  id: string,
  name: string,
  email: string,
  country: string,
  phone: number,
  token: string,
  loginType: string
}

export type Secret = {
  id: string,
  key: string,
  secret: string
}

export type SafeSecretSession = {
  usr?: User,
  secrets?: string
}
export interface LoaderProps {
  showLoader: boolean
}
