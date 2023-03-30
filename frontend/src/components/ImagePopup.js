const ImagePopup = (props) => {
  return (
    <div
      className={`popup popup_image-prev ${props.isOpen ? "popup_active" : ""}`}
    >
      <div className="popup__image-prev-container">
        <button
          className="popup__close-btn popup__close-button-image-prev"
          type="button"
          onClick={props.onClose}
        ></button>

        <img
          src={props.card.link}
          alt={props.card.name}
          className="popup__image "
        />
        <p className="popup__caption ">{props.card.name}</p>
      </div>
    </div>
  );
};
export default ImagePopup;
