/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable max-len */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import pwaVideo from '../../assets/pwa.mp4';
import '../../css/privacypolicy.scss';

const About = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="about-us-details">
      <h3>About us</h3>
      <p>
        <span className="text-clr-primary">SafeSecrets&nbsp;</span>
        started with an intent of creating an simple cloud storage for password and/or secrets which can be accessed from any where on any device. It is fast, safe and ensures segration of user data by applying two level of encryption. Double encryption enables safe secret to generate new encryption keys per password per user. The keys are also encrypted to avoid misuse in case anyone gets there hands on it. The entire infrastructure hosting and running
        <span className="text-clr-primary">&nbsp;SafeSecrets&nbsp;</span>
        is hosted with in Azure with firewalls and network security which protects againts any unauthorized access to backend. In short we ensure your secret is accessible only to you and no one else!
      </p>
      <h3>Features</h3>
      <p>
        Save Secrets:
        <br />
        <ul>
          <li>
            Login / Signup to
            <span className="text-clr-primary">&nbsp;SafeSecrets&nbsp;</span>
            .
          </li>
          <li>
            Click on
            <strong>&nbsp;Add&nbsp;</strong>
            button.
          </li>
          <li>
            Fill in secret name and secret value and save.
          </li>
        </ul>
      </p>
      <p>
        Manage Secrets:
        <br />
        <ul>
          <li>Landing page will have options to view or delete the secrets.</li>
          <li>Simply click on the view icon to view your stored secret.</li>
          <li>Similarly click on delete icon to delete a secret.</li>
          <li>
            Upon viewing a secret two more functionality will be available
            <strong>&nbsp;Edit&nbsp;</strong>
            and
            <strong>&nbsp;Share&nbsp;</strong>
            .
          </li>
          <li>
            <strong>&nbsp;Edit&nbsp;</strong>
            can be used to change the secret name and secret value and re-save it.
          </li>
          <li>
            <strong>&nbsp;Share&nbsp;</strong>
            can be used to share your secret with someone securely.
          </li>
          <li>
            Upon clicking the
            <strong>&nbsp;Share&nbsp;</strong>
            button you would need to enter the email of the person you want to share the secret with.
          </li>
          <li>
            <strong>&nbsp;Shared secrets&nbsp;</strong>
            tab will list all the secrets that you have shared or the secrets that have been shared with you.
          </li>
          <li>
            Here you can view the secrets that have been shared with you.
          </li>
          <li>
            You will also be able to revoke sharing any secret that you had shared before.
          </li>
        </ul>
      </p>
      <h3>Progressive Web App</h3>
      <p>
        We have tried to give mobile app like experience to
        <strong>&nbsp;SafeSecrets&nbsp;</strong>
        on mobile devices. Follow the below video to install the app:
        <br />
        <br />
        <video controls width="270" height="380">
          <source src={pwaVideo} type="video/mp4" />
        </video>
      </p>
      <h3>Support Us</h3>
      <p>
        Please give this application a chance, we are sure you will love it. Share you feedback with us at
        <a className="text-clr-primary" href="mailto:contactus@safesecrets.in">&nbsp;contactus@safesecrets.in</a>
      </p>
      <div className="btn-container-center">
        <button className="btn btn-primary" onClick={goBack}>Back</button>
      </div>
    </div>
  );
};

export default About;
