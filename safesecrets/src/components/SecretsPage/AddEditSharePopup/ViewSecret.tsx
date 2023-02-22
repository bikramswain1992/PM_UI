import React from 'react';
import { ViewSecretProps } from '../types';
import copyIcon from '../../../images/copy.svg';

const ViewSecret:React.FC<ViewSecretProps> = ({ name, secret }) => {
  const copySecret = () => {
    navigator.clipboard.writeText(secret);
  };
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
          <img className="copy-secret-icon" src={copyIcon} onClick={copySecret} alt="Copy icon" />
        </label>
        <textarea
          name="secret"
          placeholder="********"
          rows={3}
          value={secret}
          disabled
        />
      </div>
    </>
  );
};

export default ViewSecret;
