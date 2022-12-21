import React, { useState } from 'react';
import { VerifyContactProps } from './types';

const VerifyContact: React.FC<VerifyContactProps> = ({ showVerification, verifyContact }) => {
  const [verificationCode, setVerificationCode] = useState('');

  return (
    <>
      <div className="popup-header">
        <h4>
          Verify Email
        </h4>
      </div>
      <div className="popup-body">
        <div className="input-group-vertical">
          <label htmlFor="name">Verification Code</label>
          <input
            id="verificationCode"
            name="verificationCode"
            type="text"
            placeholder="Verification Code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
        </div>
      </div>
      <div className="popup-footer">
        <div className="btn-container-center">
          <button className="btn btn-secondary" onClick={() => showVerification(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={() => verifyContact(verificationCode)}>Verify</button>
        </div>
      </div>
    </>
  );
};

export default VerifyContact;
