import { Secret } from "../../utility/globaltypes";

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