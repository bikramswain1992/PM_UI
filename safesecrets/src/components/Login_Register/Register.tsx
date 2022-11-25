import {useState} from 'react';
import { v4 as uuid } from 'uuid';
import Alert from '../common/Alert/Alert';
import Loader from '../common/Loader/Loader';
import CountryList from '../../assets/countryList.json';
import { registerUserApi } from './api';
import { RegisterDetails, RegisterProps } from './types';
import { AlertProps, AlertType } from '../../utility/globaltypes';


const Register: React.FC<RegisterProps> = ({setSignInPopup, setShowLogin}) => {
  const [registerDetails, setRegisterDetails] = useState<RegisterDetails>({
    id: '',
    name: '',
    email: '',
    country: '',
    phone: '',
    password: ''
  });

  const [alertDetails, setAlertDetails] = useState<AlertProps>({
    title: '',
    text: '',
    type: AlertType.success,
    show: 0
  });

  const [showLoader, setShowLoader] = useState(false);

  const onChange = (e: any) => {
    setRegisterDetails({...registerDetails, [e.target.name]:e.target.value});
  }

  const closeRegister = () => {
    setShowLogin(false);
  }

  const registerUser = async () =>{
    if(!(registerDetails.name 
      && registerDetails.email 
      && registerDetails.country
      && registerDetails.phone
      && registerDetails.password)){
        setAlertDetails({
          title: '',
          text: 'All fields are required',
          type: AlertType.error,
          show: alertDetails.show+1
        });
        return;
    }

    const regex = RegExp('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*?])');
    if(!regex.test(registerDetails.password)){
      setAlertDetails({
        title: '',
        text: 'Password should contain atleast one lower case alphabet, one upper case  alphabet, one number, one special character (-+_!@#$%^&*?) and should be atleast 8 characters long.',
        type: AlertType.error,
        show: alertDetails.show+1
      });
      return;
    }
    
    setShowLoader(true);
    registerDetails.id = uuid();
    const registerResponse = await registerUserApi(registerDetails);

    setShowLoader(false);
    if(registerResponse.errors){
      if(registerResponse.errors[0].toLowerCase() === 'duplicate'){
        setAlertDetails({
          title: '',
          text: 'Email is already registered!',
          type: AlertType.error,
          show: alertDetails.show+1
        });
        return;
      }
      setAlertDetails({
        title: '',
        text: registerResponse.errors.join(','),
        type: AlertType.error,
        show: alertDetails.show+1
      });
      return;
    }

    setAlertDetails({
      title: '',
      text: 'Registration successful! Please check your inbox to verify your account.',
      type: AlertType.success,
      show: alertDetails.show+1
    });
    setSignInPopup('login');
  }

  return (
    <>
      <div className="popup-header">
        <h4>Register on <span className='text-clr-primary'>SafeSecrets</span></h4>
      </div>
      <div className="popup-body">
        <div className='input-group-vertical'>
          <label>Name</label>
          <input 
            name='name' 
            type="text" 
            placeholder='Full name'
            value={registerDetails.name}
            onChange={onChange} />
        </div>
        <div className='input-group-vertical'>
          <label>Email</label>
          <input 
            name='email' 
            type="email" 
            placeholder='abc@xyz.com'
            value={registerDetails.email}
            onChange={onChange} />
        </div>
        <div className='input-group-vertical'>
          <label>Country</label>
          <select 
            name='country'
            placeholder='USA, UK, India'
            value={registerDetails.country}
            defaultValue="null"
            onChange={onChange}>
              {
                CountryList.map(x => 
                  <option key={x.name} value={x.value}>{`${x.name} (${x.value})`}</option>
                )
              }
          </select>
        </div>
        <div className='input-group-vertical'>
          <label>Phone</label>
          <input 
            name='phone' 
            type="number" 
            placeholder='9999999999'
            value={registerDetails.phone}
            onChange={onChange} />
        </div>
        <div className='input-group-vertical'>
          <label>Password</label>
          <input 
            name='password' 
            type="password" 
            placeholder='********'
            value={registerDetails.password}
            onChange={onChange} />
        </div>
      </div>
      <div className="popup-footer">
        <div className="btn-container-center">
          <button className='btn btn-secondary' onClick={closeRegister}>Cancel</button>
          <button className='btn btn-primary' onClick={registerUser}>Register</button>
        </div>
        <a className="nav-link text-sm" onClick={() => setSignInPopup('login')}>
          Back to login
        </a>
      </div>
      <Alert title={alertDetails.title} text={alertDetails.text} type={alertDetails.type} show={alertDetails.show} />
      <Loader showLoader={showLoader}/>
    </>
  )
}

export default Register;