import React from 'react';
import getWordWithLimitedLength from '../../../utility/wordLimit';
import { SecretTabBarProps } from '../../SecretsPage/types';
import showIcon from '../../../images/show.svg';
import deleteIcon from '../../../images/delete.svg';

const SecretTabBar: React.FC<SecretTabBarProps> = ({ secret, showSecret, deleteSecret }) => (
  <div className="secret-tab-bar">
    <span className="secret-key">
      <span className="text-sm text-clr-secondary">Name</span>
      <span title={secret.key}>{getWordWithLimitedLength(secret.key)}</span>
    </span>
    <span className="secret-symbol">
      <span className="text-sm text-clr-secondary">Secret</span>
      <span>★★★★★★</span>
    </span>
    <span className="secret-actions">
      <img src={showIcon} alt="show secret" onClick={() => showSecret(secret.id)} title="View secret" />
      <img src={deleteIcon} alt="delete secret" onClick={() => deleteSecret(secret.id)} title="Delete secret" />
    </span>
  </div>
);

export default SecretTabBar;
