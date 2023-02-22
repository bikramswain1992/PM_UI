import React, { useMemo } from 'react';
import { SharedSecretsProps } from '../types';
import SharedByMe from './SharedByMe';
import SharedWithMe from './SharedWithMe';

const SharedSecretsList: React.FC<SharedSecretsProps> = (props) => {
  const { filteredSecrets, showSecret, deleteSecret } = props;

  const sharedByMe = useMemo(() => {
    const secrets = filteredSecrets?.filter((x) => x.isSharedByMe);
    return secrets;
  }, [filteredSecrets]);

  const sharedWithMe = useMemo(() => {
    const secrets = filteredSecrets?.filter((x) => !x.isSharedByMe);
    return secrets;
  }, [filteredSecrets]);

  return (
    filteredSecrets && filteredSecrets.length > 0
      ? (
        <>
          <div className="shared-secret-group">
            <h3>Secrets shared with me</h3>
            <SharedWithMe
              filteredSecrets={sharedWithMe}
              showSecret={showSecret}
              deleteSecret={() => { }}
            />
          </div>
          <div className="separator" />
          <div className="shared-secret-group">
            <h3>Secrets shared by me</h3>
            <SharedByMe
              filteredSecrets={sharedByMe}
              showSecret={showSecret}
              deleteSecret={deleteSecret}
            />
          </div>
        </>
      )
      : (
        <div className="no-secrets-message">
          You don&apos;t have any shared secrets
        </div>
      )
  );
};

export default SharedSecretsList;
