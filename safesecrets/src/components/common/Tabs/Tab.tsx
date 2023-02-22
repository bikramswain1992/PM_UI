/* eslint-disable no-unused-vars */
import React from 'react';
import { TabProps } from './types';

const Tab:React.FC<TabProps> = ({
  isActive, title, value, onClick,
}) => (
  <div className={isActive ? 'tab active-tab' : 'tab'} data-value={value} onClick={(e) => onClick(title)}>{title}</div>
);

export default Tab;
