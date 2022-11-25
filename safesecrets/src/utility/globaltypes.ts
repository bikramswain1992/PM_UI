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

export interface AlertProps {
  title?: string,
  text?: string,
  type: AlertType,
  show: number
}
export enum AlertType {
  error,
  success,
  warning,
  info,
  question
}

export interface LoaderProps {
  showLoader: boolean
}