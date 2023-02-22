import React from 'react';
import SecretList from '../../common/SecretList/SecretList';
import { barTypeVal } from '../../common/SecretList/types';
import { SharedSecretsProps } from '../types';

const SharedByMe:React.FC<SharedSecretsProps> = (props) => {
  const {
    filteredSecrets,
    showSecret,
    deleteSecret,
  } = props;

  return (
    <SecretList
      pageLength={10}
      secrets={filteredSecrets}
      message="You haven't shared any secrets yet."
      showSecret={showSecret}
      deleteSecret={deleteSecret}
      barType={barTypeVal.secretSharedByMeBar}
    />
  );
};

export default SharedByMe;
