import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../utility/session';
import '../../css/landingpage.scss';
import secure1 from '../../images/secure1.svg';

const LandingPage = () => {
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    if (user) {
      navigate('/mysecrets');
    }
  }, [user]);

  return (
    <>
      <div className="message-content">
        <div className="message">
          Your&nbsp;
          <span className="text-clr-primary">
            secrets
          </span>
          &nbsp;have never been safer!
        </div>
        <div className="secure-message">
          <img src={secure1} alt="Security image" />
        </div>
      </div>
      <div className="about">
        <div className="headings">
          <span>Safe</span>
          <span>Secure</span>
          <span>Simple</span>
        </div>
        <div className="statement">
          With&nbsp;
          <strong>
            <span className="text-clr-primary">
              SafeSecure
            </span>
          </strong>
          &apos;s advanced encryption keep all your passwords and important&nbsp;
          documents secured and out of reach of snoopers.&nbsp;
          Conveniently access your data on the go, anywhere anytime.
        </div>
      </div>
    </>
  );
};

export default LandingPage;
