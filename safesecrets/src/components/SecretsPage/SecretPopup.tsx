import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { readSecretApi } from './api';
import EditSecret from './EditSecret';
import {MySecrets, Secret} from './types';
import { SecretPopupProps  } from './types';
import ViewSecret from './ViewSecret';

const SecretPopup: React.FC<SecretPopupProps> = ({secret, closeSecretPopup, saveMySecret, token}) => {

  const [currentSecret, setCurrentSecret] = useState<MySecrets | undefined>(secret);
  const [currentSecretDetails, setCurrentSecretDetails] = useState<Secret>({
    id:'',
    key:'',
    secret:''
  });
  const [isViewMode, setIsViewMode] = useState(false);

  useEffect(() => {
    if(currentSecret){
      viewSecret();
    }
  },[currentSecret]);

  const viewSecret = async () => {
    const readSecretResponse = await readSecretApi(currentSecret?.id, token ?? '');

    if(readSecretResponse.errors){
      alert(readSecretResponse.errors[0]);
      return;
    }

    setIsViewMode(true);
    setCurrentSecretDetails({id: currentSecret?.id ?? '', key: currentSecret?.key ?? '', secret: readSecretResponse});
  }

  const saveSecret = () => {
    if(!currentSecretDetails.key && !currentSecretDetails.secret){
      alert('Please fill name and secret values before saving!');
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
    </>
  )
}

export default SecretPopup;