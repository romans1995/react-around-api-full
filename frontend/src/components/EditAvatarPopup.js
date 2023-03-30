import React, { useRef } from 'react';
import PopupWithForm from "./PopupWithForm";



const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, isLoading }) => {

  const url = useRef();
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(url.current.value);
  }
  
  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      title="Change Profile Picture"
      name="editAvatar "
      buttonText={`${isLoading ? "Changing..." : "Change"}`}
      onSubmit={handleSubmit}
    >
      <div className="popup__inputs-div">
        <input
          id="placeLink-inputAvatr"
          name="link"
          className="popup__input popup__inputs-type-placeLink"
          type="url"
          placeholder="Image url"
          ref={url}
          defaultValue=""
          required
        />
        <span
          id="placeLink-inputAvatr-error"
          className="popup__input-error placeLink-input-error "
        ></span>
      </div>
    </PopupWithForm>
  );
};
export default EditAvatarPopup;
