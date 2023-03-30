import React, { useEffect } from 'react';
import successImg from '../images/Union.svg';
import failImg from '../images/faile.svg';
import Popup from './Popup';

const InfoTooltip = ({ isOpen, onClose, tooltipStatus }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <Popup isOpen={isOpen} name="tooltip" onClose={onClose}>
      <img
        src={tooltipStatus ? successImg : failImg}
        className="tooltip__image"
        alt={`${tooltipStatus ? 'sign in success icon' : 'sign in faliure icon'}`}
      />
      <h2 className="tooltip__text">
        {tooltipStatus
          ? 'Success! You have now been registered.'
          : 'Oops, something went wrong! Please try again.'}
      </h2>
    </Popup>
  );
};
export default InfoTooltip ;