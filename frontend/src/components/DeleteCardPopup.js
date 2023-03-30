import React from "react";
import PopupWithForm from "./PopupWithForm";

const DeleteCardPopup = ({isOpen, onClose, onSubmitDelete,isLoading }) => {
  return (
    <PopupWithForm
      title="Are you sure you want to delete this?"
      name="delete-card"
      buttonText={`${isLoading ? "Deleting..." : "Yes"}`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmitDelete}
    />
  );
};

export default DeleteCardPopup;