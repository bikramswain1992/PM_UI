import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/landingpage.scss';
import secure1 from '../../images/secure1.svg';
import { getUser } from '../../utility/session';
import useImagePreloader from '../hooks/useImagePreLoader';

const LandingPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getUser());

  const preloadSrcList: string[] = [
    secure1
  ];

  const { imagesPreloaded } = useImagePreloader(preloadSrcList);

  useEffect(()=>{
    if(user){
      navigate('/mysecrets');
    }
  },[user]);

  return (
    <>
      <div className='message-content'>
        <div className="message">
          Your <span className='text-clr-primary'>secrets</span> have never been safer!
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
          With <strong><span className='text-clr-primary'>SafeSecure</span></strong>'s advanced encryption keep all your passwords and important documents secured and out of reach of snoopers. Conveniently access your data on the go, anywhere anytime.
        </div>
      </div>
    </>
  )
}

export default LandingPage;