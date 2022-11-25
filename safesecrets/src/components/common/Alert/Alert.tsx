import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { AlertProps, AlertType } from "../../../utility/globaltypes";

const Alert: React.FC<AlertProps> = ({title, text, type, show}) => {
  const MySwal = withReactContent(Swal);

  useEffect(() => {

    if(show !== 0){
      MySwal.fire({
        title: <strong>{title}</strong>,
        text: text,
        icon: getAlertType(type)
      });
    }

  },[title, text, type, show]);

  const getAlertType = (alertType: AlertType) : 'success' | 'error' | 'info' | 'warning' | 'question' => {
    switch(alertType){
      case AlertType.success: return 'success';
      case AlertType.error: return 'error';
      case AlertType.info: return 'info';
      case AlertType.warning: return 'warning';
      case AlertType.question: return 'question';
      default: return 'success';
    }
  }

  return <></>;
}

export default Alert;