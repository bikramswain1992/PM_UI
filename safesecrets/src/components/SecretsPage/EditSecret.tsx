import React from 'react';
import { EditSecretProps } from './types';

const EditSecret: React.FC<EditSecretProps> = ({ secret, onChange }) => (
  <>
    <div className="input-group-vertical">
      <label>Name</label>
      <input
        name="key"
        type="text"
        placeholder="Name"
        value={secret.key}
        onChange={onChange}
      />
    </div>
    <div className="input-group-vertical">
      <label>Secret</label>
      <textarea
        name="secret"
        placeholder="********"
        rows={3}
        value={secret.secret}
        onChange={onChange}
      />
    </div>
  </>
);

export default EditSecret;
