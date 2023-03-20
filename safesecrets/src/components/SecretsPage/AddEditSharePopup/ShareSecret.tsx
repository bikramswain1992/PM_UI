import React from 'react';
import { ShareSecretProps } from '../types';

const ShareSecret:React.FC<ShareSecretProps> = (props) => {
  const {
    name, secret, sharedWithEmail, setSharedWithEmail,
  } = props;

  return (
    <>
      <div className="input-group-vertical">
        <label>Name</label>
        <input
          name="key"
          type="text"
          placeholder="Name"
          value={name}
          disabled
        />
      </div>
      <div className="input-group-vertical readonly-secret">
        <label>
          <span>Secret</span>
        </label>
        <textarea
          name="secret"
          placeholder="********"
          rows={3}
          value={secret}
          disabled
        />
      </div>
      <div className="input-group-vertical readonly-secret">
        <label>
          <span>User email</span>
        </label>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={sharedWithEmail}
          onChange={(e) => setSharedWithEmail(e.target.value)}
        />
      </div>
    </>
  );
};

export default ShareSecret;
