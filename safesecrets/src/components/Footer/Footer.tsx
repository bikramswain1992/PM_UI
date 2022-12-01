import React from 'react';
import '../../css/footer.scss';

const Footer = () => (
  <div className="site-footer">
    <div className="footer-content">
      <div className="left-content">
        Copy right ©
        <span className="text-clr-primary">SafeSecrets</span>
        {new Date().getFullYear()}
      </div>
      <div className="right-content">
        <a href="mailto:contactus@safesecrets.in">Contact us</a>
      </div>
    </div>
  </div>
);

export default Footer;
