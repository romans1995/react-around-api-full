import PopupWithForm from "./PopupWithForm";
import React, { useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditProfilePopup = ({ isOpen, onClose,onUpdateUser,isLoading}) => {
  const [name, setUserName] = useState('');
  const [about, setUserDiscription] = useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setUserName(currentUser.currentUser.name);
    setUserDiscription(currentUser.currentUser.about);
  }, [currentUser,isOpen]); 

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setUserDiscription(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: about,
    });
  } 

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Edit profile"
      name="Edit profile-popup"
      buttonText={`${isLoading ? "Saving..." : "Save"}`}
      onSubmit={handleSubmit}
    >
      <div className="popup__inputs-div">
        <input
          id="name-input"
          name="name"
          className="popup__input popup__inputs-type-name"
          type="text"
          placeholder="Name"
          minLength="2"
          maxLength="40"
          onChange = {handleNameChange}
          value ={name || ""}
          required
        />
        <span
          id="name-input-error"
          className="popup__input-error name-input-error"
        ></span>
      </div>
      <div className="popup__inputs-div">
        <input
          id="description-input"
          name="job"
          className=" popup__input popup__inputs-type-description "
          type="text"
          placeholder="Description"
          minLength="2"
          maxLength="200" 
          value ={about || ""}    
          onChange = {handleDescriptionChange}
          required
        />
        <span
          id="description-input-error"
          className="popup__input-error description-input-error"
        ></span>
      </div>
    </PopupWithForm>
  );
};
export default EditProfilePopup;
