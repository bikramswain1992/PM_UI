import { useEffect, useMemo, useState } from 'react'
import {getUser, clearCacheAndRedirect, setViewedSecrets} from '../../utility/session';
import SecretPopup from './SecretPopup';
import Popup from '../common/popup/Popup';
import Alert from '../common/Alert/Alert';
import Loader from '../common/Loader/Loader';
import { deleteSecretApi, getMySecretsApi, saveMySecretsApi } from './api';
import { MySecrets } from './types';
import { AlertProps, AlertType, Secret } from '../../utility/globaltypes';
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

  const [alertDetails, setAlertDetails] = useState<AlertProps>({
    title: '',
    text: '',
    type: AlertType.success,
    show: 0
  });
  const [showLoader, setShowLoader] = useState(false);

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
    setShowLoader(true);
    const mySecrets = await getMySecretsApi(user?.token);

    if(mySecrets.errors){
      if(mySecrets.type.toLowerCase() == "forbidden"){
        setShowLoader(false);
        clearCacheAndRedirect();
        return;
      }
      if(mySecrets.type.toLowerCase() == "notfound"){
        setShowLoader(false);
        return;
      }
      setAlertDetails({
        title: '',
        text: mySecrets.errors.join(','),
        type: AlertType.error,
        show: alertDetails.show+1
      });
      setShowLoader(false);
      return;
    }
    
    setShowLoader(false);
    setMySecrets([...mySecrets]);
  }

  const showSecret = (id: string) => {
    setCurrentSecret(mySecrets?.filter(item => item.id === id)[0]);
  }

  const deleteSecret = async (id: string) => {
    const deleteSecretResponse = await deleteSecretApi(id, user?.token!);

    if(deleteSecretResponse.errors){
      alert(deleteSecretResponse.errors.join(','));
    }

    let otherSecrets = mySecrets?.filter(x => x.id !== id);
    if(!otherSecrets){
      otherSecrets = [];
    }
    setMySecrets([...otherSecrets]);
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
    setShowLoader(true);
    const saveSecretResponse = await saveMySecretsApi(secret, user?.token!)

    if(saveSecretResponse.errors){
      setShowLoader(false);
      setAlertDetails({
        title: '',
        text: saveSecretResponse.errors.join(','),
        type: AlertType.error,
        show: alertDetails.show+1
      });
      return;
    }
    setShowLoader(false);
    setAlertDetails({
      title: '',
      text: 'Your secret has been successfully saved!',
      type: AlertType.success,
      show: alertDetails.show+1
    });
    let otherSecrets = mySecrets?.filter(x => x.id !== secret.id);
    if(!otherSecrets){
      otherSecrets = [{id: secret.id, key: secret.key}];
    }
    else{
      otherSecrets.push({id: secret.id, key: secret.key});
    }
    setMySecrets([...otherSecrets]);
    closeAddSecretPopup();

    setViewedSecrets(secret);
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
                  <img src={deleteIcon} alt="delete secret" onClick={() => deleteSecret(x.id)} />
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
      <Alert title={alertDetails.title} text={alertDetails.text} type={alertDetails.type} show={alertDetails.show} />
      <Loader showLoader={showLoader}/>
    </>
  )
}

export default SecretsPage