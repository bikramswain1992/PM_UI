import React from 'react';

export interface PopupProps {
  children: any
  customClass?: string,
}

const Popup: React.FC<PopupProps> = ({ children, customClass }) => (
  <>
    <div className="popup-cover" />
    <div className={`${customClass} popup`}>
      {children}
    </div>
  </>
);

export default Popup;
