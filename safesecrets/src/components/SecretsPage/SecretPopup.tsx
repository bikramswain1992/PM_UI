import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import EditSecret from './AddEditSharePopup/EditSecret';
import ViewSecret from './AddEditSharePopup/ViewSecret';
import Loader from '../common/Loader/Loader';
import { readSecretApi } from './api';
import { Secret } from '../../utility/globaltypes';
import { SecretPopupProps } from './types';
import { getViewedSecret, setViewedSecrets } from '../../utility/session';
import ShareSecret from './AddEditSharePopup/ShareSecret';

const SecretPopup: React.FC<SecretPopupProps> = ({
  secret, closeSecretPopup, saveMySecret, token, isSharingEnabled, shareSecret,
}) => {
  const MySwal = withReactContent(Swal);
  const currentSecret = secret;
  const [currentSecretDetails, setCurrentSecretDetails] = useState<Secret>({
    id: '',
    key: '',
    secret: '',
  });
  const [popupMode, setPopupMode] = useState('edit');
  const [sharedWithEmail, setSharedWithEmail] = useState('');

  const [showLoader, setShowLoader] = useState(false);

  const viewSecret = async () => {
    let viewedSecret = getViewedSecret(currentSecret?.id!);

    if (!viewedSecret) {
      setShowLoader(true);
      const readSecretResponse = await readSecretApi(currentSecret?.id!, token!);
      setShowLoader(false);

      if (readSecretResponse.errors) {
        MySwal.fire({
          text: readSecretResponse.errors.join(','),
          icon: 'error',
          confirmButtonText: 'Ok',
        });
        return;
      }
      viewedSecret = {
        id: currentSecret?.id!,
        key: currentSecret?.key!,
        secret: readSecretResponse,
      };
    }

    setPopupMode('view');
    setCurrentSecretDetails({
      id: currentSecret?.id!,
      key: currentSecret?.key!,
      secret: viewedSecret.secret,
    });
    setViewedSecrets(viewedSecret);
  };

  useEffect(() => {
    if (currentSecret) {
      viewSecret();
    }
  }, [currentSecret]);

  const saveSecret = () => {
    if (!currentSecretDetails.key && !currentSecretDetails.secret) {
      MySwal.fire({
        text: 'Please fill name and secret values before saving!',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }
    if (currentSecretDetails.id) {
      saveMySecret(currentSecretDetails);
      return;
    }
    saveMySecret({ ...currentSecretDetails, id: uuid() });
  };

  const handleShareSecret = () => {
    if (!sharedWithEmail) {
      MySwal.fire({
        text: 'Please provide the email of user with whome you want to share the secret!',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }

    if (shareSecret) {
      shareSecret(currentSecretDetails, sharedWithEmail);
    }
  };

  const onChange = (e: any) => {
    setCurrentSecretDetails({ ...currentSecretDetails, [e.target.name]: e.target.value });
  };

  const showHeaderWithMode = () => {
    if (popupMode === 'view') {
      return (
        <h4>
          <span className="text-clr-primary">
            &nbsp;
            <strong>SafeSecrets</strong>
            &nbsp;
          </span>
          vault
        </h4>
      );
    }
    if (popupMode === 'edit') {
      return (
        <h4>
          Add secret to
          <span className="text-clr-primary">
            &nbsp;
            <strong>SafeSecrets</strong>
            &nbsp;
          </span>
          vault
        </h4>
      );
    }
    return (
      <h4>
        Share secret with
        <span className="text-clr-primary">
          &nbsp;
          <strong>SafeSecrets</strong>
          &nbsp;
        </span>
        vault
      </h4>
    );
  };

  const showPopupWithMode = () => {
    if (popupMode === 'view') {
      return <ViewSecret name={currentSecretDetails.key} secret={currentSecretDetails.secret} />;
    }
    if (popupMode === 'edit') {
      return <EditSecret secret={currentSecretDetails} onChange={onChange} />;
    }
    return (
      <ShareSecret
        name={currentSecretDetails.key}
        secret={currentSecretDetails.secret}
        sharedWithEmail={sharedWithEmail}
        setSharedWithEmail={setSharedWithEmail}
      />
    );
  };

  const showButtonsWithMode = () => {
    if (popupMode === 'view') {
      if (isSharingEnabled) {
        return (
          <>
            <button className="btn btn-primary" onClick={() => setPopupMode('edit')}>Edit</button>
            <button className="btn btn-primary" onClick={() => setPopupMode('share')}>Share</button>
          </>
        );
      }
      return <button className="btn btn-primary" onClick={() => setPopupMode('edit')}>Edit</button>;
    }
    if (popupMode === 'edit') {
      return <button className="btn btn-primary" onClick={saveSecret}>Save</button>;
    }
    return <button className="btn btn-primary" onClick={handleShareSecret}>Share</button>;
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
          <button className="btn btn-secondary" onClick={closeSecretPopup}>Close</button>
          {
            showButtonsWithMode()
          }
        </div>
      </div>
      <Loader showLoader={showLoader} />
    </>
  );
};

export default SecretPopup;
