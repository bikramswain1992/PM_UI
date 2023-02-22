import React from 'react';
import { SharedSecretTabBarProps } from '../../SecretsPage/types';
import showIcon from '../../../images/show.svg';
import deleteIcon from '../../../images/delete.svg';

const SharedSecretTabBar:React.FC<SharedSecretTabBarProps> = (props) => {
  const { sharedSecret, showSecret, deleteSecret } = props;
  return (
    <div className="secret-tab-bar">
      <span className="secret-key">
        <span className="text-sm text-clr-secondary">Name</span>
        <span>{sharedSecret.key}</span>
      </span>
      <span className="secret-symbol">
        <span className="text-sm text-clr-secondary">{sharedSecret.isSharedByMe ? 'Shared with' : 'Shared by'}</span>
        <span>{sharedSecret.userName}</span>
      </span>
      <span className="secret-actions">
        <img src={showIcon} alt="show secret" onClick={() => showSecret(sharedSecret.id)} />
        {
          sharedSecret.isSharedByMe
            ? <img src={deleteIcon} alt="delete secret" onClick={() => deleteSecret(sharedSecret.id)} />
            : <div />
        }
      </span>
    </div>
  );
};

export default SharedSecretTabBar;
