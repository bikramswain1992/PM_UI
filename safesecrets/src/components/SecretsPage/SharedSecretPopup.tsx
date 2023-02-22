import React, { useState } from 'react';
import Loader from '../common/Loader/Loader';
import { SharedSecretPopupProps } from './types';

const SharedSecretPopup:React.FC<SharedSecretPopupProps> = (props) => {
  const { sharedSecret, closeSharedSecretPopup } = props;

  const [showLoader, setShowLoader] = useState(false);

  const showHeaderWithMode = () => {
    if (sharedSecret.isSharedByMe) {
      return (
        <h4>
          <span className="text-clr-primary">
            &nbsp;
            <strong>SafeSecrets</strong>
            &nbsp;
          </span>
          by vault
        </h4>
      );
    }
    return (
      <h4>
        <span className="text-clr-primary">
          &nbsp;
          <strong>SafeSecrets</strong>
          &nbsp;
        </span>
        with vault
      </h4>
    );
  };

  const showPopupWithMode = () => {

  };

  const showButtonsWithMode = () => {

  };

  return (
    <>
      <div className="popup-header">
        {
          showHeaderWithMode()
        }
      </div>
      <div className="popup-body">
        {
          showPopupWithMode()
        }
      </div>
      <div className="popup-footer">
        <div className="btn-container-center">
          <button className="btn btn-secondary" onClick={closeSharedSecretPopup}>Cancel</button>
          {
            showButtonsWithMode()
          }
        </div>
      </div>
      <Loader showLoader={showLoader} />
    </>
  );
};

export default SharedSecretPopup;
