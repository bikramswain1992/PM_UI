/* eslint-disable max-len */
import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="about-us-details">
      <h3>About us</h3>
      <p>
        At
        <span className="text-clr-primary">&nbsp;SafeSecrets</span>
        , we are committed to protecting the privacy of our users. This Privacy Policy explains how we collect, use, and share information about you when you use our website https://safesecrets.in.
      </p>
      <h3>Collection of Information</h3>
      <p>
        We collect information about you when you use our website. This may include the following:
        <br />
        <ul>
          <li>Information you provide directly to us: We collect information that you provide to us directly, such as when you sign up for a newsletter or create an account on our website. This information may include your name, email address, and any other information you choose to provide.</li>
          <li>Information we collect automatically: When you use our website, we may automatically collect information about you, such as your IP address, browser type, and operating system. We may also collect information about your usage of our website, such as the pages you visit and the actions you take.</li>
        </ul>
      </p>
      <h3>Use of Information</h3>
      <p>
        We use the information we collect about you for the following purposes:
        <br />
        <ul>
          <li>To provide, maintain, and improve our website: We use the information we collect to provide, maintain, and improve our website and the services we offer. This may include using your information to respond to your requests, to personalize your experience on our website, and to improve the functionality and performance of our website.</li>
          <li>To communicate with you: We may use the information we collect to communicate with you, such as to send you newsletters or updates about our website.</li>
          <li>For legal purposes: We may use the information we collect as necessary for legal purposes, such as to comply with our legal obligations, to enforce our policies, and to protect the rights and safety of our users and others.</li>
        </ul>
      </p>
      <h3>Sharing of Information</h3>
      <p>
        We do not share your personal information with third parties except in the following circumstances:
        <ul>
          <li>With your consent: We may share your information with third parties if you have given us your consent to do so.</li>
          <li>For legal reasons: We may share your information as necessary to comply with the law, to enforce our policies, or to protect the rights and safety of our users and others.</li>
        </ul>
      </p>
      <h3>Data Security</h3>
      <p>We take reasonable measures to protect the information we collect from loss, misuse, and unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the internet, or method of electronic storage, is 100% secure, and we cannot guarantee the absolute security of your information.</p>
      <h3>Your Choices</h3>
      <p>
        You have the following choices regarding the information we collect about you:
        <br />
        <ul>
          <li>
            Opt-out of communications: You can opt-out of receiving communications from us by contacting us at&nbsp;
            <a className="text-clr-primary" href="mailto:contactus@safesecrets.in">contactus@safesecrets.in</a>
          </li>
        </ul>
      </p>
      <div className="btn-container-center">
        <button className="btn btn-primary" onClick={goBack}>Back</button>
      </div>
    </div>
  );
};

export default About;
