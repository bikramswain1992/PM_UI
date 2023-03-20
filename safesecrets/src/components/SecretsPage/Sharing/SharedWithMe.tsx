import React from 'react';
import SecretList from '../../common/SecretList/SecretList';
import { barTypeVal } from '../../common/SecretList/types';
import { SharedSecretsProps } from '../types';

const SharedWithMe:React.FC<SharedSecretsProps> = (props) => {
  const {
    filteredSecrets,
    showSecret,
    revokeSharing,
  } = props;

  return (
    <SecretList
      pageLength={10}
      secrets={filteredSecrets}
      message="No secrets have been shared with you."
      showSecret={showSecret}
      deleteSecret={revokeSharing}
      barType={barTypeVal.secretSharedWithMeBar}
    />
  );
};

export default SharedWithMe;
