import React from 'react';
import { SecretFilterProps } from './types';
import searchIcon from '../../images/search.svg';
import addIcon from '../../images/add.svg';

const SecretFilter: React.FC<SecretFilterProps> = ({ searchKey, setSearchKey, addSecret }) => (
  <div className="my-secrets-header secret-tab-bar">
    <div className="search-keys">
      <input type="text" placeholder="Search" value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />
      <img src={searchIcon} alt="search" />
    </div>
    <button className="btn btn-primary add-secret-btn" onClick={addSecret}>
      <span>Add</span>
      <img src={addIcon} alt="Add secret" />
    </button>
  </div>
);

export default SecretFilter;
