import React, {useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Main = ({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  handleCardClick,
  onCardLike ,
  onCardDelete ,
  cards
   
}) => {
  
  const currentUser = useContext(CurrentUserContext);
  return (
    <main className="main">
      <section className="profile">
        <div onClick={onEditAvatarClick} className="profile__img-container">
          <img
            src={currentUser.currentUser.avatar}
            className="profile__img"
            alt="profile img"
          />
        </div>
        <div className="profile__description">
          <div className="profile__description-button">
            <h1 className="profile__description-name"> {currentUser.currentUser.name} </h1>
            <button
              onClick={onEditProfileClick}
              className="profile__edit"
              type="button"
            />
          </div>
          <p className="profile__description-prof"> {currentUser.currentUser.about} </p>
        </div>
        <button
          className="profile__add"
          onClick={onAddPlaceClick}
          type="button"
        />
      </section>
      <div className="elements">
        <ul className="elements__list">
          
          {cards.map((card) => {
            return (
              <Card card={card} key={card._id} onCardClick={handleCardClick} onCardLike ={onCardLike}  onCardDelete ={onCardDelete } />
            );
          })}
        </ul>
      </div>
    </main>
  );
};
export default Main;
