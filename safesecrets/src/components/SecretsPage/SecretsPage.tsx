import { useEffect, useMemo, useState } from 'react'
import {getUser, clearCacheAndRedirect} from '../../utility/user';
import { GetMySecretsAPI } from '../../utility/passwordmanagerapis';
import '../../css/secretspage.scss';
import searchIcon from '../../images/search.svg';
import addIcon from '../../images/add.svg';
import showIcon from '../../images/show.svg';
import deleteIcon from '../../images/delete.svg';
import SecretPopup from './SecretPopup';
import { getMySecretsApi } from './api';

export interface MySecrets {
  id: string,
  key: string
}

export interface Secret {
  id: string,
  key: string,
  secret: string
}

const SecretsPage = () => {

  const [user, setUser] = useState(getUser());
  const [mySecrets, setMySecrets] = useState<MySecrets[] | null>(null)
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

  const saveMySecret = async (secret:MySecrets) => {

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
                <span>{x.key}</span>
                <span>********</span>
                <span>
                  <img src={showIcon} alt="show secret" onClick={() => showSecret(x.id)} />
                </span>
                <span>
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
        <div className="add-secret-popup popup">
          <SecretPopup secret={currentSecret} closeSecretPopup={closeAddSecretPopup} saveMySecret={saveMySecret} />
        </div>
        :
        <></>
      }
    </>
  )
}

export default SecretsPage