import React, { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import SecretPopup from './SecretPopup';
import Popup from '../common/popup/Popup';
import Loader from '../common/Loader/Loader';
import SecretFilter from './SecretFilter';
import SecretTabBar from './SecretTabBar';
import {
  getUser, clearCacheAndRedirect, setViewedSecrets, setViewedSecretsWithDelete 
} from '../../utility/session';
import { deleteSecretApi, getMySecretsApi, saveMySecretsApi } from './api';
import { Secret } from '../../utility/globaltypes';
import { MySecrets } from './types';
import '../../css/secretspage.scss';

const SecretsPage = () => {
  const MySwal = withReactContent(Swal);
  const user = useMemo(() => getUser(), []);

  const [mySecrets, setMySecrets] = useState<MySecrets[] | undefined>();
  const [searchKey, setSearchKey] = useState('');
  const [showSecretPopup, setShowSecretPopup] = useState(false);
  const [currentSecret, setCurrentSecret] = useState<MySecrets>();

  const [showLoader, setShowLoader] = useState(false);

  const filteredSecrets = useMemo(() => mySecrets?.filter(
    (item) => item.key.toLowerCase().includes(searchKey.toLowerCase()),
  ), [searchKey, mySecrets]);

  const addSecret = () => {
    setShowSecretPopup(true);
  };

  const getMySecrets = async () => {
    setShowLoader(true);
    const mySecretsResponse = await getMySecretsApi(user?.token);

    if (mySecretsResponse.errors) {
      if (mySecretsResponse.type.toLowerCase() === 'forbidden') {
        setShowLoader(false);
        clearCacheAndRedirect();
        return;
      }
      if (mySecretsResponse.type.toLowerCase() === 'notfound') {
        setShowLoader(false);
        return;
      }
      MySwal.fire({
        text: mySecretsResponse.errors.join(','),
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      setShowLoader(false);
      return;
    }

    setShowLoader(false);
    setMySecrets([...mySecretsResponse]);
  };

  useEffect(() => {
    if (!user) {
      clearCacheAndRedirect();
    } else {
      getMySecrets();
    }
  }, [user]);

  const showSecret = (id: string) => {
    setCurrentSecret(mySecrets?.filter((item) => item.id === id)[0]);
  };

  const deleteSecret = async (id: string) => {
    const sercetName = filteredSecrets?.filter((x) => x.id === id)[0].key;
    MySwal.fire({
      text: `Please confirm if you would want to delete ${sercetName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ok',
      denyButtonText: 'Cancel',
    }).then(async (response) => {
      if (response.isConfirmed) {
        setShowLoader(true);
        const deleteSecretResponse = await deleteSecretApi(id, user?.token!);
        setShowLoader(false);

        if (deleteSecretResponse.errors) {
          MySwal.fire({
            text: deleteSecretResponse.errors.join(','),
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }

        let otherSecrets = mySecrets?.filter((x) => x.id !== id);
        if (!otherSecrets) {
          otherSecrets = [];
        }
        setMySecrets([...otherSecrets]);
        setViewedSecretsWithDelete(id);
      }
    });
  };

  useEffect(() => {
    if (currentSecret) {
      setShowSecretPopup(true);
    }
  }, [currentSecret]);

  const closeAddSecretPopup = () => {
    setCurrentSecret(undefined);
    setShowSecretPopup(false);
  };

  const saveMySecret = async (secret:Secret) => {
    setShowLoader(true);
    const saveSecretResponse = await saveMySecretsApi(secret, user?.token!);

    if (saveSecretResponse.errors) {
      setShowLoader(false);
      MySwal.fire({
        text: saveSecretResponse.errors.join(','),
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }
    setShowLoader(false);
    MySwal.fire({
      text: 'Your secret has been successfully saved!',
      icon: 'success',
      confirmButtonText: 'Ok',
    });
    let otherSecrets = mySecrets?.filter((x) => x.id !== secret.id);
    if (!otherSecrets) {
      otherSecrets = [{ id: secret.id, key: secret.key }];
    } else {
      otherSecrets.push({ id: secret.id, key: secret.key });
    }
    setMySecrets([...otherSecrets]);
    closeAddSecretPopup();

    setViewedSecrets(secret);
  };

  return (
    <>
      <SecretFilter searchKey={searchKey} setSearchKey={setSearchKey} addSecret={addSecret} />
      {
        filteredSecrets
          ? (
            <div className="my-secrets-main">
              {
                filteredSecrets.map((x) => (
                  <SecretTabBar secret={x} showSecret={showSecret} deleteSecret={deleteSecret} />
                ))
              }
            </div>
          )
          : (
            <div className="no-secrets-message">
              You don&apos;t have any secrets. Start adding now.
            </div>
          )
      }
      {
        showSecretPopup
          ? (
            <Popup customClass="add-secret-popup">
              <SecretPopup
                secret={currentSecret}
                closeSecretPopup={closeAddSecretPopup}
                saveMySecret={saveMySecret}
                token={user?.token}
              />
            </Popup>
          )
          : <div />
      }
      <Loader showLoader={showLoader} />
    </>
  );
};

export default SecretsPage;
