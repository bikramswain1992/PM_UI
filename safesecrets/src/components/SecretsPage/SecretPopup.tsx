import { useState } from 'react'
import {MySecrets} from './SecretsPage';

const SecretPopup = ({secret, closeSecretPopup, saveMySecret}) => {

  const [currentSecret, setCurrentSecret] = useState<MySecrets>(secret);

  const closeLogin = () =>{
    closeSecretPopup();
  }

  const saveSecret = () => {
    saveMySecret(currentSecret);
  }

  const onChange = (e: any) => {
    setCurrentSecret({...currentSecret, [e.target.name]: e.target.value});
  }

  return (
    <>
      <div className="popup-header">
        <h4>Add secret to <span className='text-clr-primary'>SafeSecrets</span> vault</h4>
      </div>
      <div className="popup-body">
        <div className='input-group-vertical'>
          <label>Key</label>
          <input
            name='key'
            type="text"
            placeholder='Key'
            value={currentSecret.key}
            onChange={onChange} />
        </div>
        <div className='input-group-vertical'>
          <label>Secret</label>
          <input
            name='secret'
            type="text"
            placeholder='********'
            value={currentSecret.secret}
            onChange={onChange} />
        </div>
      </div>
      <div className="popup-footer">
        <div className="btn-container-center">
          <button className='btn btn-secondary' onClick={closeLogin}>Cancel</button>
          <button className='btn btn-primary' onClick={saveSecret}>Save</button>
        </div>
      </div>
    </>
  )
}

export default SecretPopup;