import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/footer.scss';

const Footer = () => {
  const navigate = useNavigate();

  const gotoPrivacyPolicy = () => {
    navigate('/privacypolicy');
  };

  return (
    <div className="site-footer">
      <div className="footer-content">
        <div className="left-content">
          Copy right ©
          <span className="text-clr-primary">SafeSecrets</span>
          {new Date().getFullYear()}
        </div>
        <div className="right-content">
          <a onClick={gotoPrivacyPolicy}>Privacy policy</a>
          <span>|</span>
          <a href="mailto:contactus@safesecrets.in">Contact us</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
