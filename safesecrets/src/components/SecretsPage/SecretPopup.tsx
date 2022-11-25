import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { readSecretApi } from './api';
import EditSecret from './EditSecret';
import {MySecrets} from './types';
import { AlertProps, AlertType, Secret } from '../../utility/globaltypes';
import { SecretPopupProps  } from './types';
import ViewSecret from './ViewSecret';
import Alert from '../common/Alert/Alert';
import Loader from '../common/Loader/Loader';
import { getViewedSecret, setViewedSecrets } from '../../utility/session';

const SecretPopup: React.FC<SecretPopupProps> = ({secret, closeSecretPopup, saveMySecret, token}) => {

  const [currentSecret, setCurrentSecret] = useState<MySecrets | undefined>(secret);
  const [currentSecretDetails, setCurrentSecretDetails] = useState<Secret>({
    id:'',
    key:'',
    secret:''
  });
  const [isViewMode, setIsViewMode] = useState(false);

  const [alertDetails, setAlertDetails] = useState<AlertProps>({
    title: '',
    text: '',
    type: AlertType.success,
    show: 0
  });
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if(currentSecret){
      viewSecret();
    }
  },[currentSecret]);

  const viewSecret = async () => {
    let viewedSecret = getViewedSecret(currentSecret?.id!);

    if(!viewedSecret) {
      setShowLoader(true);
      const readSecretResponse = await readSecretApi(currentSecret?.id!, token!);

      if(readSecretResponse.errors){
        setShowLoader(false);
        setAlertDetails({
          title: '',
          text: readSecretResponse.errors.join(','),
          type: AlertType.error,
          show: alertDetails.show+1
        });
        return;
      }
      viewedSecret = {
        id: currentSecret?.id!,
        key: currentSecret?.key!,
        secret: readSecretResponse
      };
    }

    setIsViewMode(true);
    setCurrentSecretDetails({id: currentSecret?.id!, key: currentSecret?.key!, secret: viewedSecret.secret});
    setViewedSecrets(viewedSecret);
    setShowLoader(false);
  }

  const saveSecret = () => {
    if(!currentSecretDetails.key && !currentSecretDetails.secret){
      setAlertDetails({
        title: '',
        text: 'Please fill name and secret values before saving!',
        type: AlertType.error,
        show: alertDetails.show+1
      });
      return;
    }
    if(currentSecretDetails.id){
      saveMySecret(currentSecretDetails);
      return;
    }
    saveMySecret({...currentSecretDetails, id: uuid()});
  }

  const onChange = (e: any) => {
    setCurrentSecretDetails({...currentSecretDetails, [e.target.name]: e.target.value});
  }

  return (
    <>
      <div className="popup-header">
        <h4>Add secret to <span className='text-clr-primary'>SafeSecrets</span> vault</h4>
      </div>
      <div className="popup-body">
        {
          isViewMode
          ?
          <ViewSecret name={currentSecretDetails.key} secret={currentSecretDetails.secret} />
          :
          <EditSecret secret={currentSecretDetails} onChange={onChange} />
        }
      </div>
      <div className="popup-footer">
        <div className="btn-container-center">
          <button className='btn btn-secondary' onClick={closeSecretPopup}>Cancel</button>
          {
            isViewMode
            ?
            <button className='btn btn-primary' onClick={() => setIsViewMode(false)}>Edit</button>
            :
            <button className='btn btn-primary' onClick={saveSecret}>Save</button>
          }
        </div>
      </div>
      <Alert title={alertDetails.title} text={alertDetails.text} type={alertDetails.type} show={alertDetails.show} />
      <Loader showLoader={showLoader}/>
    </>
  )
}

export default SecretPopup;