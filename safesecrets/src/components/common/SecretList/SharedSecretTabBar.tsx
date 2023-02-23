import React from 'react';
import getWordWithLimitedLength from '../../../utility/wordLimit';
import { SharedSecretTabBarProps } from '../../SecretsPage/types';
import showIcon from '../../../images/show.svg';
import revokeIcon from '../../../images/revokeSharing.svg';

const SharedSecretTabBar:React.FC<SharedSecretTabBarProps> = (props) => {
  const { sharedSecret, showSecret, deleteSecret } = props;
  return (
    <div className="secret-tab-bar">
      <span className="secret-key">
        <span className="text-sm text-clr-secondary">Name</span>
        <span title={sharedSecret.key}>{getWordWithLimitedLength(sharedSecret.key)}</span>
      </span>
      <span className="secret-symbol">
        <span className="text-sm text-clr-secondary">{sharedSecret.isSharedByMe ? 'Shared with' : 'Shared by'}</span>
        <span title={sharedSecret.userName}>{getWordWithLimitedLength(sharedSecret.userName)}</span>
      </span>
      <span className="secret-actions">
        <img src={showIcon} alt="show secret" onClick={() => showSecret(sharedSecret.id)} title="View secret" />
        {
          sharedSecret.isSharedByMe
            ? <img src={revokeIcon} alt="delete secret" onClick={() => deleteSecret(sharedSecret.id)} title="Revoke sharing" />
            : <div />
        }
      </span>
    </div>
  );
};

export default SharedSecretTabBar;
