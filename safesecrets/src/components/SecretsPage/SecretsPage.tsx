import { useEffect, useMemo, useState } from 'react'
import {getUser, clearCacheAndRedirect} from '../../utility/user';
import { GetMySecretsAPI } from '../../utility/passwordmanagerapis';
import SecretPopup from './SecretPopup';
import Popup from '../common/popup/Popup';
import { getMySecretsApi, saveMySecretsApi } from './api';
import { MySecrets, Secret } from './types';
import '../../css/secretspage.scss';
import searchIcon from '../../images/search.svg';
import addIcon from '../../images/add.svg';
import showIcon from '../../images/show.svg';
import deleteIcon from '../../images/delete.svg';


const SecretsPage = () => {

  const [user, setUser] = useState(getUser());
  const [mySecrets, setMySecrets] = useState<MySecrets[] | undefined>()
  const [searchKey, setSearchKey] = useState('');
  const [showSecretPopup, setShowSecretPopup] = useState(false);
  const [currentSecret, setCurrentSecret] = useState<MySecrets>();

  const filteredSecrets = useMemo(
    () => {
      return mySecrets?.filter(item => {
        return item.key.toLowerCase().includes(searchKey.toLowerCase())
      })
  },[searchKey,mySecrets]);

  useEffect(() => {
    if(!user){
      clearCacheAndRedirect();
    }
    else{
      getMySecrets();
    }
  },[user]);

  const addSecret = () => {
    setShowSecretPopup(true);
  }

  const getMySecrets = async () => {
    const mySecrets = await getMySecretsApi(user?.token);

    if(mySecrets.errors){
      if(mySecrets.type.toLowerCase() == "forbidden"){
        clearCacheAndRedirect();
        return;
      }
      if(mySecrets.type.toLowerCase() == "notfound"){
        return;
      }
      alert(mySecrets.errors.join(','));
      return;
    }

    setMySecrets([...mySecrets]);
  }

  const showSecret = (id: string) => {
    setCurrentSecret(mySecrets?.filter(item => item.id === id)[0]);
  }

  useEffect(() => {
    if(currentSecret){
      setShowSecretPopup(true);
    }
  },[currentSecret])

  const closeAddSecretPopup = () => {
    setCurrentSecret(undefined);
    setShowSecretPopup(false);
  }

  const saveMySecret = async (secret:Secret) => {
    const saveSecretResponse = await saveMySecretsApi(secret, user?.token)

    if(saveSecretResponse.errors){
      alert(saveSecretResponse.errors[0]);
      return;
    }

    alert('Your secret has been successfully saved!');
    setMySecrets((prev) => {
      return [...prev!, {id: secret.id, key: secret.key}];
    });
    closeAddSecretPopup();
  }

  return (
    <>
      <div className="my-secrets-header secret-tab-bar">
        <div className="search-keys">
          <input type="text" placeholder='Search' value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />
          <img src={searchIcon} alt="search" />
        </div>
        <button className='btn btn-primary add-secret-btn' onClick={addSecret}>
          <span>Add</span>
          <img src={addIcon} alt="Add secret" />
        </button>
      </div>
      {
        filteredSecrets
        ?
        <div className="my-secrets-main">
          {
            filteredSecrets.map((x,_) => 
              <div className='secret-tab-bar' key={_}>
                <span className='secret-key'>
                  <span className='text-sm text-clr-secondary'>Name</span>
                  <span>{x.key}</span>
                </span>
                <span className='secret-symbol'>
                  <span className='text-sm text-clr-secondary'>Secret</span>
                  <span>★★★★★★</span>
                </span>
                <span className='secret-actions'>
                  <img src={showIcon} alt="show secret" onClick={() => showSecret(x.id)} />
                  <img src={deleteIcon} alt="delete secret" />
                </span>
              </div>
            )
          }
        </div>
        :
        <div className="no-secrets-message">
          You don't have any secrets. Start adding now.
        </div>
      }
      {
        showSecretPopup
        ?
        <Popup customClass='add-secret-popup'>
          <SecretPopup secret={currentSecret} closeSecretPopup={closeAddSecretPopup} saveMySecret={saveMySecret} token={user?.token} />
        </Popup>
        :
        <></>
      }
    </>
  )
}

export default SecretsPage