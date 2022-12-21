/* eslint-disable no-unused-vars */
import { MySecrets } from '../../SecretsPage/types';

export interface SecretListProps {
  pageLength: number,
  secrets?: MySecrets[],
  message: string,
  showSecret: (e: string) => void,
  deleteSecret: (e: string) => void
}
