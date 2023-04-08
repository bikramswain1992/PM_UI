import React from 'react';
import SecretList from '../common/SecretList/SecretList';
import { barTypeVal } from '../common/SecretList/types';
import { MySecretProps } from './types';

const MySecretsList: React.FC<MySecretProps> = (props) => {
  const {
    filteredSecrets,
    showSecret,
    deleteSecret,
  } = props;

  return (
    <SecretList
      pageLength={10}
      secrets={filteredSecrets}
      message="You don't have any secrets. Start adding now."
      showSecret={showSecret}
      deleteSecret={deleteSecret}
      barType={barTypeVal.secretBar}
    />
  );
};

export default MySecretsList;
