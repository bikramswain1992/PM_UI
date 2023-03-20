/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { MySecrets, SharedSecrets } from '../../SecretsPage/types';

export enum barTypeVal {
  secretBar,
  secretSharedByMeBar,
  secretSharedWithMeBar
}

export interface SecretListProps {
  pageLength: number,
  secrets?: MySecrets[] | SharedSecrets[],
  message: string,
  showSecret: (e: string) => void,
  deleteSecret: (e: string) => void,
  barType: barTypeVal
}
