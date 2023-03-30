import React from "react";

const PopupWithForm = ({isOpen, onClose, name, title, buttonText, children,onSubmit}) => {
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
        <form
          action="submit"
          className={`popup__inputs-container popup__inputs-${name}`}
          name={name}
          onSubmit={onSubmit}
          
        >
          {children}

          <button
            className={`popup__submit-button popup__submit-button-${name}`}
            type="submit"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
