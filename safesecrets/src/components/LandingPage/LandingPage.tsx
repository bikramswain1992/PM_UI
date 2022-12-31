import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../utility/session';
import { LandingPageProps } from './types';
import '../../css/landingpage.scss';
import secureImage from '../../images/secure1.svg';
import documentLocked from '../../images/document-locked.svg';
import secureShare from '../../images/secure-share.svg';
import generatePassword from '../../images/generate-password.svg';

const LandingPage: React.FC<LandingPageProps> = ({ setShowLogin, setPopupType }) => {
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    if (user) {
      navigate('/mysecrets');
    }
  }, [user]);

  const openRegistrationPopup = () => {
    setPopupType('login');
    setShowLogin(true);
  };

  return (
    <div className="landingpage-content">
      <section className="hero landingpage-section">
        <div className="hero-static">
          <div className="hero-image">
            <img src={secureImage} alt="Security image" />
          </div>
          <div className="hero-message">
            <div className="hero-message-line">Your password&nbsp;</div>
            <div className="hero-message-line">
              - is your&nbsp;
              <span className="text-clr-primary">password</span>
            </div>
            <div className="hero-message-line">
              Keep your passwords secure with our private vault and access
              them with one click from all your devices.
            </div>
          </div>
        </div>
        <div className="hero-action">
          <button className="btn btn-primary" onClick={openRegistrationPopup}>Try it!</button>
        </div>
      </section>
      <section className="features landingpage-section">
        <div className="feature">
          <div className="feature-image">
            <img src={documentLocked} alt="Encryption feature" />
          </div>
          <div className="feature-message">Multi-layer encryption to protect your passwords</div>
        </div>
        <div className="feature">
          <div className="feature-image">
            <img src={secureShare} alt="Sharing password feature" />
          </div>
          <div className="feature-message">Securely access and share your secrets with others</div>
        </div>
        <div className="feature">
          <div className="feature-image">
            <img src={generatePassword} alt="Password generation feature" />
          </div>
          <div className="feature-message">Generate and use new password on the go</div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
