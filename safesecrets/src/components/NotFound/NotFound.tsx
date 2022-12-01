import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/notfound.scss';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="not-found-cover" />
      <div className="not-found">
        <div className="not-found-header">
          404
        </div>
        <p className="not-found-message">
          The page you are looking for could not be found!
        </p>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>Go back</button>
      </div>
    </>
  );
};

export default NotFound;
