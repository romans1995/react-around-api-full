import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


const Card = (props) => {
  const currentUser = useContext(CurrentUserContext);
  const isLikedByCurrentUser = props.card.likes.some(

    (user) => user._id === currentUser.currentUser._id
  );
  const cardLikeButtonClassName = isLikedByCurrentUser ? "element__like-button_active" : "element__like-button";
  const isOwn = props.card.owner._id === currentUser.currentUser._id;
  function handleLikeClick() {
    props.onCardLike(props.card)
  }
  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleDeleteClick(e) {
    e.preventDefault();
    props.onCardDelete(props.card)
  }
  return (
    <li className="element">
      <button
        type="button"
        aria-label="delete element"
        className={
          isOwn ? "element__delete-button" : "element__delete-button_hidden"
        }
        onClick={handleDeleteClick}
      />
      <img
        onClick={handleClick}
        src={props.card.link}
        alt={props.card.name}
        className="element__image"
      />
      <div className="element__title-area">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-countainer">
          <button
            className={`element__like-button ${cardLikeButtonClassName}`}
            type="button "
            aria-label="like element"
            onClick={handleLikeClick}
          />
          <span className="element__likes-count" defaultValue="0">
            {props.card.likes ? props.card.likes.length : 0}
          </span>
        </div>
      </div>
    </li>
  );
};

export default Card;

