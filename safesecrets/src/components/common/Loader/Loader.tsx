import React, { useState } from 'react';
import LoaderImg from '../../../images/loading.gif';
import { LoaderProps } from '../../../utility/globaltypes';

const Loader: React.FC<LoaderProps> = ({showLoader}) => {
  return (
    showLoader
    ?
    <>
      <div className='popup-cover'></div>
      <img className='loader-image' src={LoaderImg} alt='Loading' />
    </>
    :
    <></>
  )
}

export default Loader;