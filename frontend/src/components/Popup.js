import React from "react";

const Popup = ({isOpen, onClose, name, title,children}) => {
  return (
    <div
      className={`popup ${name} ${isOpen ? "popup_active" : ""}`}
    >
      <div className="popup__container">
        <button
          className="popup__close-btn"
          type="button"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Popup;
