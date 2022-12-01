import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Loader from '../common/Loader/Loader';
import CountryList from '../../assets/countryList.json';
import { registerUserApi } from './api';
import { RegisterDetails, RegisterProps } from './types';

const Register: React.FC<RegisterProps> = ({ setSignInPopup, setShowLogin }) => {
  const MySwal = withReactContent(Swal);

  const [registerDetails, setRegisterDetails] = useState<RegisterDetails>({
    id: '',
    name: '',
    email: '',
    country: '',
    phone: '',
    password: '',
  });
  const [showLoader, setShowLoader] = useState(false);

  const onChange = (e: any) => {
    setRegisterDetails({ ...registerDetails, [e.target.name]: e.target.value });
  };

  const closeRegister = () => {
    setShowLogin(false);
  };

  const registerUser = async () => {
    if (!(registerDetails.name
      && registerDetails.email
      && registerDetails.country
      && registerDetails.phone
      && registerDetails.password)) {
      MySwal.fire({
        text: 'All fields are required',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }

    const regex = /(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*?])/;
    if (!regex.test(registerDetails.password)) {
      MySwal.fire({
        text: 'Password should contain atleast one lower case alphabet, one upper case  alphabet, one number, one special character (-+_!@#$%^&*?) and should be atleast 8 characters long.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }

    setShowLoader(true);
    registerDetails.id = uuid();
    const registerResponse = await registerUserApi(registerDetails);
    setShowLoader(false);

    if (registerResponse.errors) {
      if (registerResponse.errors[0].toLowerCase() === 'duplicate') {
        MySwal.fire({
          text: 'Email is already registered!',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
        return;
      }
      MySwal.fire({
        text: registerResponse.errors.join(','),
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }

    MySwal.fire({
      text: 'Registration successful!',
      icon: 'success',
      confirmButtonText: 'Ok',
    });
    setSignInPopup('login');
  };

  return (
    <>
      <div className="popup-header">
        <h4>
          Register on
          <span className="text-clr-primary">SafeSecrets</span>
        </h4>
      </div>
      <div className="popup-body">
        <div className="input-group-vertical">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Full name"
            value={registerDetails.name}
            onChange={onChange}
          />
        </div>
        <div className="input-group-vertical">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="abc@xyz.com"
            value={registerDetails.email}
            onChange={onChange}
          />
        </div>
        <div className="input-group-vertical">
          <label htmlFor="country">Country</label>
          <select
            id="country"
            name="country"
            placeholder="USA, UK, India"
            value={registerDetails.country}
            defaultValue="null"
            onChange={onChange}
          >
            {
              CountryList.map((x) => <option key={x.name} value={x.value}>{`${x.name} (${x.value})`}</option>)
            }
          </select>
        </div>
        <div className="input-group-vertical">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            type="number"
            placeholder="9999999999"
            value={registerDetails.phone}
            onChange={onChange}
          />
        </div>
        <div className="input-group-vertical">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            value={registerDetails.password}
            onChange={onChange}
          />
        </div>
      </div>
      <div className="popup-footer">
        <div className="btn-container-center">
          <button className="btn btn-secondary" onClick={closeRegister}>Cancel</button>
          <button className="btn btn-primary" onClick={registerUser}>Register</button>
        </div>
        <a className="nav-link text-sm" onClick={() => setSignInPopup('login')}>
          Back to login
        </a>
      </div>
      <Loader showLoader={showLoader} />
    </>
  );
};

export default Register;
