/* eslint-disable no-unused-vars */
import { Secret } from '../../utility/globaltypes';

export type MySecrets = {
  id: string,
  key: string
}

export type SharedSecrets = {
  id: string,
  secretId: string,
  key: string,
  userId: string,
  userName: string,
  isSharedByMe: boolean
}

export type ShareSecretModel = {
  secretId: string,
  sharedWithUserEmail: string
}

export interface SecretPopupProps {
  secret: MySecrets | undefined,
  closeSecretPopup: () => void,
  saveMySecret: (e: Secret) => void,
  token?: string
  isSharingEnabled?: boolean,
  shareSecret?: (e: Secret, email: string) => void
}

export interface EditSecretProps {
  secret: Secret,
  onChange: (e: any) => void;
}

export interface ViewSecretProps {
  name: string,
  secret: string
}

export interface SecretFilterProps {
  searchKey: string,
  setSearchKey: (e: string) => void,
  addSecret: () => void
}

export interface SecretTabBarProps {
  secret: MySecrets,
  showSecret: (e: string) => void
  deleteSecret: (e: string) => void
}

export interface MySecretProps {
  filteredSecrets: MySecrets[] | undefined,
  showSecret: (e: string) => void,
  deleteSecret: (e: string) => void
}

export interface SharedSecretsProps {
  filteredSecrets: SharedSecrets[] | undefined,
  showSecret: (e: string) => void,
  deleteSecret: (e: string) => void
}

export interface ShareSecretProps extends ViewSecretProps {
  sharedWithEmail: string,
  setSharedWithEmail: (e: string) => void;
}

export interface SharedSecretPopupProps {
  sharedSecret: SharedSecrets
  closeSharedSecretPopup: () => void
}

export interface SharedSecretTabBarProps {
  sharedSecret: SharedSecrets,
  showSecret: (e: string) => void
  deleteSecret: (e: string) => void
}
