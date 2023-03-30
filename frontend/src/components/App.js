import React, { useState, useEffect } from "react";
import { Redirect, Route, useHistory, Switch } from 'react-router-dom';
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup .js";
import EditProfilePopup from "./EditProfilePopup";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import DeleteCardPopup from "./DeleteCardPopup"
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
// import auth from '../utils/auth';
import { signIn, checkTocken, signUp } from '../utils/auth';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";
import InfoTooltip from "./InfoTooltip";

// css
import "../index.css";
import "../blocks/body.css";
import "../blocks/header.css";
import "../blocks/main.css";
import "../blocks/profile.css";
import "../blocks/elements.css";
import "../blocks/element.css";
import "../blocks/popup.css";
import "../blocks/footer.css";

// Main statements section 
function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [isetDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
  });
  const [cards, setCards] = useState([]);
  const [userEmail, setUserEmail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();
  const [ischeckToken, setIsCheckToken] = useState(true);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [tooltipStatus, setTooltipStatus] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));



  const handleAddPlaceSubmit = (name, link) => {
    setIsLoading(true);
    api.createCard({ name, link }).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch(console.log)
      .finally(() => setIsLoading(false));
  }

  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    // Send a request to the API and getting the updated card data
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((cards) => cards.map((currentCard) => currentCard._id === card._id ? newCard : currentCard));
    }).catch(console.log);
  }
  function handleCardDelete(e) {
    e.preventDefault();
    setIsLoading(true);
    api.deleteCard(selectedCard._id).then((newCard) => {
      setIsLoading(false);
      const newCards = cards.filter(
        (currentCard) => currentCard._id !== selectedCard._id
      );
      setCards(newCards);
      closeAllPopups();
    }).catch(console.log);
  }
  const handleUpdateUser = ({ name, about }) => {
    setIsLoading(true);
    api
      .setUserInfo({ name, about }).then((res) => {
        setIsLoading(false);
        setCurrentUser(res)
        closeAllPopups();
      }).catch(console.log);
  }
  const handleUpdateAvatar = (url) => {
    setIsLoading(true);
    api.setAvatarImage(url).then((res) => {
      setIsLoading(false);
      setCurrentUser(res);
      closeAllPopups();
    }).catch(console.log);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };


  const handleDeleteButtonClick = (card) => {
    setDeletePopupOpen(true);
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePreviewOpen(false);
    setDeletePopupOpen(false);
    setIsInfoTooltipOpen(false);
  };
  const handleCardClick = (card) => {
    setIsImagePreviewOpen(true);
    setSelectedCard({
      name: card.name,
      link: card.link,
    });
  };

  const handleLogin = (email, password) => {
    signIn(email, password)
      .then(res => {
        if (res.token) {
          setIsLoggedIn(true);
          localStorage.setItem('token', res.token);
          setUserEmail(email);
          history.push('/around-react');
        } else {
          setTooltipStatus(false);
          setIsInfoTooltipOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setTooltipStatus(false);
        setIsInfoTooltipOpen(true);
      });
  }
  const handleRegister = (email, password) => {
    signUp(email, password)
      .then(res => {
        if (res.data._id) {
          setTooltipStatus(true);
          history.push('/signin');
        } else {
          setTooltipStatus(false);
          history.push('/signup')
        }
      }).catch(err => console.log(err)).finally(() => setIsInfoTooltipOpen(true));
  }

  // useEffect section 
  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }
    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
  }, []);


  useEffect(() => {
    api
      .getUserInformation()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(console.log);
  }, []);
  useEffect(() => {
    api
      .getInitalCards()
      .then((res) => {
        setCards(res);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkTocken(token).then(res => {
        setIsLoggedIn(true);
        setUserEmail(res.data.email)
        history.push('/');
      }).catch((err) => {
        console.log(err);
        history.push('/signin');
        setIsLoggedIn(false);
      })
        .finally(() => {
          setIsCheckToken(false);
        });
    }
  }, [isLoggedIn, history, token])



  return (
    <div className="body">
      <CurrentUserContext.Provider
        value={{ currentUser: currentUser, userEmail: userEmail }}>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userEmail={userEmail} />
        <Switch>
          <ProtectedRoute
            path="/around-react"
            isLoggedIn={isLoggedIn}
            ischeckToken={ischeckToken}
            setIsLoggedIn={setIsLoggedIn}
          >

            <Main
              cards={cards}
              onEditAvatarClick={handleEditAvatarClick}
              onEditProfileClick={handleEditProfileClick}
              onAddPlaceClick={handleAddPlaceClick}
              handleCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteButtonClick}
            />
          </ProtectedRoute>
          <Route path="/signIn">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path="/signup">
            <Register handleRegister={handleRegister} />
          </Route>
          <Route>
            {isLoggedIn ?
              <Redirect to="/around-react" />
              :
              <Redirect to="/signin" />
            }
          </Route>
        </Switch>
        <Footer />
        <PopupWithForm
          title="Are you sure?"
          name="delete-card"
          buttonText="Delete"
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onSubmit={handleAddPlaceSubmit}
          isLoading={isLoading} />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePreviewOpen}
          onClose={closeAllPopups}
        />
        <DeleteCardPopup
          isLoading={isLoading}
          isOpen={isetDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmitDelete={handleCardDelete}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          tooltipStatus={tooltipStatus}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
