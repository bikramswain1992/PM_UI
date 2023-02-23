import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Secret } from '../../utility/globaltypes';
import { getViewedSecret, setViewedSecrets } from '../../utility/session';
import Loader from '../common/Loader/Loader';
import ViewSecret from './AddEditSharePopup/ViewSecret';
import { deleteSharedSecretApi, readSecretApi } from './api';
import { SharedSecretPopupProps } from './types';

const SharedSecretPopup:React.FC<SharedSecretPopupProps> = (props) => {
  const MySwal = withReactContent(Swal);
  const { sharedSecret, closeSharedSecretPopup, token, revokeSharing } = props;
  const [currentSecretDetails, setCurrentSecretDetails] = useState<Secret>({
    id: '',
    key: '',
    secret: '',
  });

  const [showLoader, setShowLoader] = useState(false);

  const viewSecret = async () => {
    let viewedSecret = getViewedSecret(sharedSecret?.secretId!);

    if (!viewedSecret) {
      setShowLoader(true);
      const readSecretResponse = await readSecretApi(sharedSecret?.secretId!, token!);
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
        id: sharedSecret?.secretId!,
        key: sharedSecret?.key!,
        secret: readSecretResponse,
      };
    }

    setCurrentSecretDetails({
      id: sharedSecret?.secretId!,
      key: sharedSecret?.key!,
      secret: viewedSecret.secret,
    });
    setViewedSecrets(viewedSecret);
  };

  useEffect(() => {
    if (sharedSecret) {
      viewSecret();
    }
  }, [sharedSecret]);

  const showHeaderWithMode = () => {
    if (sharedSecret?.isSharedByMe) {
      return (
        <h4>
          <span className="text-clr-primary">
            &nbsp;
            <strong>SafeSecrets</strong>
            &nbsp;
          </span>
          shared with vault
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
        shared by vault
      </h4>
    );
  };

  // eslint-disable-next-line max-len
  const showPopupWithMode = () => <ViewSecret name={currentSecretDetails.key} secret={currentSecretDetails.secret} />;

  const showButtonsWithMode = () => {
    if (sharedSecret?.isSharedByMe) {
      return (
        <>
          <button className="btn btn-secondary" onClick={closeSharedSecretPopup}>Close</button>
          <button className="btn btn-primary" onClick={revokeSharing}>Revoke</button>
        </>
      );
    }
    return <button className="btn btn-secondary" onClick={closeSharedSecretPopup}>Close</button>;
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
