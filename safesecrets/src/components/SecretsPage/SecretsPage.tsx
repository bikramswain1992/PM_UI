/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Loader from '../common/Loader/Loader';
import SecretFilter from './SecretFilter';
import Tabs from '../common/Tabs/Tabs';
import {
  getUser, clearCacheAndRedirect, setViewedSecrets, setViewedSecretsWithDelete,
} from '../../utility/session';
import { deleteSecretApi, deleteSharedSecretApi, getMySecretsApi, getSharedSecretsApi, saveMySecretsApi, shareSecretApi } from './api';
import { Secret } from '../../utility/globaltypes';
import { MySecrets, SharedSecrets } from './types';
import '../../css/secretspage.scss';
import Tab from '../common/Tabs/Tab';
import { TabProps } from '../common/Tabs/types';
import MySecretsList from './MySecretsList';
import SharedSecretsList from './Sharing/SharedSecretsList';
import Popup from '../common/popup/Popup';
import SecretPopup from './SecretPopup';
import SharedSecretPopup from './SharedSecretPopup';

const SecretsPage = () => {
  const MySwal = withReactContent(Swal);
  const user = useMemo(() => getUser(), []);

  const [mySecrets, setMySecrets] = useState<MySecrets[] | undefined>();
  const [sharedSecrets, setSharedSecrets] = useState<SharedSecrets[] | undefined>();
  const [searchKey, setSearchKey] = useState('');
  const [showSecretPopup, setShowSecretPopup] = useState(false);
  const [currentSecret, setCurrentSecret] = useState<MySecrets>();
  const [showSharedSecretPopup, setShowSharedSecretPopup] = useState(false);
  const [currentSharedSecret, setCurrentSharedSecret] = useState<SharedSecrets>();

  const [showLoader, setShowLoader] = useState(false);

  const [tabs, setTabs] = useState<TabProps[]>([
    {
      isActive: true,
      title: 'My secrets',
    },
    {
      isActive: false,
      title: 'Shared secrets',
    },
  ]);

  const filteredSecrets = useMemo(() => mySecrets?.filter(
    (item) => item.key.toLowerCase().includes(searchKey.toLowerCase()),
  ), [searchKey, mySecrets]);

  const filteredSharedSecrets = useMemo(() => sharedSecrets?.filter(
    (item) => item.key.toLowerCase().includes(searchKey.toLowerCase()),
  ), [searchKey, sharedSecrets]);

  /* Common region */

  const getMySecrets = async () => {
    const mySecretsResponse = await getMySecretsApi(user?.token);

    if (mySecretsResponse.errors) {
      if (mySecretsResponse.type.toLowerCase() === 'forbidden') {
        clearCacheAndRedirect();
        return;
      }
      if (mySecretsResponse.type.toLowerCase() === 'notfound') {
        return;
      }
      MySwal.fire({
        text: mySecretsResponse.errors.join(','),
        icon: 'error',
        confirmButtonText: 'Ok',
      });

      return;
    }

    setMySecrets([...mySecretsResponse]);
  };

  const getSharedSecrets = async () => {
    const sharedSecretsResponse = await getSharedSecretsApi(user?.token);

    if (sharedSecretsResponse.errors) {
      if (sharedSecretsResponse.type.toLowerCase() === 'forbidden') {
        clearCacheAndRedirect();
        return;
      }
      if (sharedSecretsResponse.type.toLowerCase() === 'notfound') {
        setSharedSecrets([]);
        return;
      }
      MySwal.fire({
        text: sharedSecretsResponse.errors.join(','),
        icon: 'error',
        confirmButtonText: 'Ok',
      });

      return;
    }

    setSharedSecrets([...sharedSecretsResponse]);
  };

  const getAllSecrets = async () => {
    setShowLoader(true);
    const allSecrets = await Promise.all([getMySecrets(), getSharedSecrets()]);
    setShowLoader(false);
  };

  useEffect(() => {
    if (!user) {
      clearCacheAndRedirect();
    } else {
      getAllSecrets();
    }
  }, [user]);

  const handleTabSwitch = (title: string) => {
    setSearchKey('');
    const newActiveConfig = tabs.map((x) => {
      if (x.title === title) {
        return { ...x, isActive: true };
      }
      return { ...x, isActive: false };
    });

    setTabs([...newActiveConfig]);
  };

  /* Common region */

  /* Secrets region */

  useEffect(() => {
    if (currentSecret) {
      setShowSecretPopup(true);
    }
  }, [currentSecret]);

  const showSecret = (id: string) => {
    setCurrentSecret(mySecrets?.filter((item) => item.id === id)[0]);
  };

  const addSecret = () => {
    setShowSecretPopup(true);
  };

  const closeSecretPopup = () => {
    setCurrentSecret(undefined);
    setShowSecretPopup(false);
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
        getSharedSecrets();
      }
    });
  };

  const saveMySecret = async (secret:Secret) => {
    setShowLoader(true);
    const saveSecretResponse = await saveMySecretsApi(secret, user?.token!);
    setShowLoader(false);

    if (saveSecretResponse.errors) {
      MySwal.fire({
        text: saveSecretResponse.errors.join(','),
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }
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
    closeSecretPopup();

    setViewedSecrets(secret);
  };

  /* Secrets region */

  /* Shared Secrets region */

  const showSharedSecret = (id: string) => {
    setCurrentSharedSecret(sharedSecrets?.filter((item) => item.id === id)[0]);
  };

  useEffect(() => {
    if (currentSharedSecret) {
      setShowSharedSecretPopup(true);
    }
  }, [currentSharedSecret]);

  const closeSharedSecretPopup = () => {
    setCurrentSharedSecret(undefined);
    setShowSharedSecretPopup(false);
  };

  const shareSecret = async (secret:Secret, sharedWithUserEmail: string) => {
    if (sharedWithUserEmail === user?.email) {
      MySwal.fire({
        text: 'Nice try! You already have access to this secret. Please provide another email to share with.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }
    setShowLoader(true);
    const shareSecretResponse = await shareSecretApi({
      secretId: secret.id,
      sharedWithUserEmail,
    }, user?.token!);
    setShowLoader(false);

    if (shareSecretResponse.errors) {
      MySwal.fire({
        text: 'Could not share your secret. Please check the email again.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }

    MySwal.fire({
      text: 'Your secret has been successfully shared!',
      icon: 'success',
      confirmButtonText: 'Ok',
    });
    getSharedSecrets();
    closeSecretPopup();
  };

  const revokeSharing = async (id?: string) => {
    const currentId = id ?? currentSharedSecret?.id!;
    const sercetName = filteredSharedSecrets?.filter((x) => x.id === currentId)[0];
    MySwal.fire({
      text: `Please confirm if you would want to revoke access for ${sercetName?.key}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ok',
      denyButtonText: 'Cancel',
    }).then(async (response) => {
      if (response.isConfirmed) {
        setShowLoader(true);
        const deleteSharedSecretResponse = await deleteSharedSecretApi(currentId, user?.token!);
        setShowLoader(false);

        if (deleteSharedSecretResponse.errors) {
          MySwal.fire({
            text: deleteSharedSecretResponse.errors.join(','),
            icon: 'error',
            confirmButtonText: 'Ok',
          });
          return;
        }
        MySwal.fire({
          text: `Access for secret ${sercetName?.key} has been revoked for user ${sercetName?.userName}`,
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        closeSharedSecretPopup();
        getSharedSecrets();
      }
    });
  };

  /* Shared Secrets region */

  return (
    <div>
      {
        user
          ? (
            <>
              <Tabs>
                {
                  tabs.map((x) => (
                    <Tab
                      key={x.title}
                      isActive={x.isActive}
                      title={x.title}
                      onClick={(e) => handleTabSwitch(x.title)}
                    />
                  ))
                }
              </Tabs>
              <SecretFilter
                searchKey={searchKey}
                setSearchKey={setSearchKey}
                addSecret={addSecret}
              />
              {
                tabs.filter((x) => x.isActive)[0].title === 'My secrets'
                  ? (
                    <MySecretsList
                      filteredSecrets={filteredSecrets}
                      showSecret={showSecret}
                      deleteSecret={deleteSecret}
                    />
                  )
                  : (
                    <SharedSecretsList
                      filteredSecrets={filteredSharedSecrets}
                      showSecret={showSharedSecret}
                      revokeSharing={revokeSharing}
                    />
                  )
              }
              {
                showSecretPopup
                  ? (
                    <Popup customClass="secret-popup">
                      <SecretPopup
                        secret={currentSecret}
                        closeSecretPopup={closeSecretPopup}
                        saveMySecret={saveMySecret}
                        token={user.token}
                        isSharingEnabled
                        shareSecret={shareSecret}
                      />
                    </Popup>
                  )
                  : <div />
              }
              {
                showSharedSecretPopup
                  ? (
                    <Popup customClass="shared-secret-popup">
                      <SharedSecretPopup
                        sharedSecret={currentSharedSecret}
                        closeSharedSecretPopup={closeSharedSecretPopup}
                        token={user.token}
                        revokeSharing={revokeSharing}
                      />
                    </Popup>
                  )
                  : <div />
              }
              <Loader showLoader={showLoader} />
            </>
          )
          : <div />
      }
    </div>
  );
};

export default SecretsPage;
