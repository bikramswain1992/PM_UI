import React from 'react';
import '../../../css/tabs.scss';

const Tabs: React.FC<any> = ({ children }) => (
  <div className="nav-tabs">
    {children}
  </div>
);

export default Tabs;
