/* eslint-disable no-unused-vars */
import { Secret } from '../../utility/globaltypes';

export type MySecrets = {
  id: string,
  key: string
}

export interface SecretPopupProps {
  secret: MySecrets | undefined,
  closeSecretPopup: () => void,
  saveMySecret: (e: Secret) => void,
  token?: string
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
