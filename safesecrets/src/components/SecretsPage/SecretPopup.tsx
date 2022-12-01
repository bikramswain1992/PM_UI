import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import EditSecret from './EditSecret';
import ViewSecret from './ViewSecret';
import Loader from '../common/Loader/Loader';
import { readSecretApi } from './api';
import { Secret } from '../../utility/globaltypes';
import { SecretPopupProps } from './types';
import { getViewedSecret, setViewedSecrets } from '../../utility/session';

const SecretPopup: React.FC<SecretPopupProps> = ({
  secret, closeSecretPopup, saveMySecret, token,
}) => {
  const MySwal = withReactContent(Swal);
  const currentSecret = secret;
  const [currentSecretDetails, setCurrentSecretDetails] = useState<Secret>({
    id: '',
    key: '',
    secret: '',
  });
  const [isViewMode, setIsViewMode] = useState(false);

  const [showLoader, setShowLoader] = useState(false);

  const viewSecret = async () => {
    let viewedSecret = getViewedSecret(currentSecret?.id!);

    if (!viewedSecret) {
      setShowLoader(true);
      const readSecretResponse = await readSecretApi(currentSecret?.id!, token!);

      if (readSecretResponse.errors) {
        setShowLoader(false);
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

    setIsViewMode(true);
    setCurrentSecretDetails({
      id: currentSecret?.id!,
      key: currentSecret?.key!,
      secret: viewedSecret.secret,
    });
    setViewedSecrets(viewedSecret);
    setShowLoader(false);
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

  const onChange = (e: any) => {
    setCurrentSecretDetails({ ...currentSecretDetails, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="popup-header">
        {
          isViewMode
            ? (
              <h4>
                <span className="text-clr-primary">&nbsp;SafeSecrets&nbsp;</span>
                vault
              </h4>
            )
            : (
              <h4>
                Add secret to
                <span className="text-clr-primary">&nbsp;SafeSecrets&nbsp;</span>
                vault
              </h4>
            )
        }
      </div>
      <div className="popup-body">
        {
          isViewMode
            ? <ViewSecret name={currentSecretDetails.key} secret={currentSecretDetails.secret} />
            : <EditSecret secret={currentSecretDetails} onChange={onChange} />
        }
      </div>
      <div className="popup-footer">
        <div className="btn-container-center">
          <button className="btn btn-secondary" onClick={closeSecretPopup}>Cancel</button>
          {
            isViewMode
              ? <button className="btn btn-primary" onClick={() => setIsViewMode(false)}>Edit</button>
              : <button className="btn btn-primary" onClick={saveSecret}>Save</button>
          }
        </div>
      </div>
      <Loader showLoader={showLoader} />
    </>
  );
};

export default SecretPopup;
