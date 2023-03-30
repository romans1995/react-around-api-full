import PopupWithForm from "./PopupWithForm";
import React, { useState } from "react";
const AddPlacePopup = ({ isOpen, onClose, onSubmit, isLoading }) => {
  const [cardName, setCardName] = useState('');
  const [url, setCardUrl] = useState('');

  React.useEffect(() => {
    setCardName('');
    setCardUrl('');
}, [isOpen]);

  const handleCardName = (e) => {
    setCardName(e.target.value);
  };

  const handleCardUrl = (e) => {
    setCardUrl(e.target.value);
  };
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(cardName, url);
  }


  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      title="New place"
      name="addPlace"
      buttonText={`${isLoading ? "creating..." : "Create"}`}
      onSubmit={handleSubmit}
    >
      <div className="popup__inputs-div">
        <input
          id="placeName-input"
          name="name"
          className="popup__input popup__inputs-type-placeName "
          value={cardName}
          type="text"
          placeholder="Title "
          minLength="1"
          maxLength="30"
          onChange={handleCardName}
          required
        />
        <span
          id="placeName-input-error"
          className="popup__input-error name-input-error"
        ></span>
      </div>
      <div className="popup__inputs-div">
        <input
          id="placeLink-input"
          name="link"
          className="popup__input popup__inputs-type-placeLink"
          value={url}
          type="url"
          placeholder="Image url"
          onChange={handleCardUrl}
          required
        />
        <span
          id="placeLink-input-error"
          className="popup__input-error placeLink-input-error "
        ></span>
      </div>
    </PopupWithForm>
  );
};
export default AddPlacePopup;
