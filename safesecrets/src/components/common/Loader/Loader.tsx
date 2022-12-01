import React from 'react';
import LoaderImg from '../../../images/loading.gif';
import { LoaderProps } from '../../../utility/globaltypes';
import '../../../css/popup.scss';

const Loader: React.FC<LoaderProps> = ({ showLoader }) => (
  showLoader
    ? (
      <>
        <div className="popup-cover" />
        <img className="loader-image" src={LoaderImg} alt="Loading" />
      </>
    )
    : <div />
);

export default Loader;
