//Импортируем компоненты REACT
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

//Импортируем созданые компоненты
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

//Импортируем компоненты API
import {checkAuthData, signIn, signUp} from "../utils/authorization";
import apiRequest from '../utils/api';

function App() {
  const [editAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [editProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [addCardPopupOpen, setAddCardPopupOpen] = useState(false);
  const [ImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isRenderLoading, setIsRenderLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
        apiRequest.getUserInfo(),
        apiRequest.getCards()
    ]).then(([userData, cardData]) => {
        setCurrentUser(userData);
        setCards(cardData);
    }).catch(err => console.log(err));
}, []);



  function handleAvatarPopupClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleProfilePopupClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddCardPopupClick() {
    setAddCardPopupOpen(true);
  }

  function closePopup() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddCardPopupOpen(false);
    setImagePopupOpen(false);
    setInfoTooltipOpen(false)
  }

  function handleCardClick(card) {
    setImagePopupOpen(true);
    setSelectedCard({
      name: card.name,
      link: card.link,
    });
  }

  function handleCardDelete(card) {
    apiRequest
      .deleteCard(card._id)
      .then(() => {
        setCards((cardsArr) =>
          cardsArr.filter((cardItem) => cardItem._id !== card._id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const liked = card.likes.some((id) => id === currentUser._id);
    apiRequest
      .changeLikeCard(card._id, !liked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditAvatar({ avatar }) {
    apiRequest
      .editAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closePopup();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditUser({ name, about }) {
    setIsRenderLoading(true);
    apiRequest
      .editProfile({ name, about })
      .then((res) => {
        setCurrentUser(res);
        closePopup();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddCard({ title, link }) {
    console.log(title, link);
    apiRequest
      .addNewCard({ title, link })
      .then((res) => {
        setCards((cards) => [res, ...cards]);
        closePopup();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleRegister = async (data) => {
    try {
        await signUp(data);
        setInfoTooltipOpen(true);
        setStatus('accept');
        navigate("/sign-in")
    } catch(err) {
        console.log(err)
        setInfoTooltipOpen(true);
        setStatus('failed');
    }
}

const handleSignIn = async (data) => {
  try {
      const {token} = await signIn(data);
      localStorage.setItem('jwt', token);
      setIsLoggedIn(true);
      setUserEmail(data.email);
      navigate("/")
  } catch(err) {
      console.log(err);
      setInfoTooltipOpen(true);
      setStatus('failed');
  }
}

function handleSignExit(){
  localStorage.removeItem('jwt');
  setIsLoggedIn(false);
  setUserEmail('');
  navigate('/sign-in')
} 

useEffect(() =>{
  const jwt = localStorage.getItem('jwt');

  if(jwt) {
      checkAuthData(jwt)
      .then((res) => {
          setIsLoggedIn(true);
          setUserEmail(res.email);
          navigate('/')
      })
      .catch((err) => console.log(err))
  }
}, [navigate])
  


  return (
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
        <Header userEmail={userEmail} onSignExit={handleSignExit}/>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
        <Main
          cards={cards}
          onProfilePopup={handleProfilePopupClick}
          onAddPopup={handleAddCardPopupClick}
          onAvatarPopup={handleAvatarPopupClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        </ProtectedRoute>
        }/>
        <Route path="/sign-up" element={<Register onSubmit={handleRegister}/>}/>
        <Route path="/sign-in" element={<Login onSubmit={handleSignIn}/>}/>
        </Routes>
        <Footer />
        <EditProfilePopup
          opened={editProfilePopupOpen}
          closed={closePopup}
          editUserInfo={handleEditUser}
          isRenderLoading={isRenderLoading}
        />
        <AddPlacePopup
          opened={addCardPopupOpen}
          closed={closePopup}
          openAddPlace={handleAddCard}
        />
        <ImagePopup
          name="fullscreen-image"
          card={selectedCard}
          closed={closePopup}
          opened={ImagePopupOpen}
        />
        <PopupWithForm
          name="delete-card"
          title="Вы уверены?"
          buttonText="Да"
          closed={closePopup}
        />
        <EditAvatarPopup
          opened={editAvatarPopupOpen}
          closed={closePopup}
          openEditAvatar={handleEditAvatar}
        />
        <InfoTooltip
          name="status"
          opened={infoTooltipOpen}
          closed={closePopup}
          status={status}
        />
      </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
