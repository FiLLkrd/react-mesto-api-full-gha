import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import Card from "./Card";

export default function Main(props) {
  const { onAvatarPopup, onProfilePopup, onAddPopup } = props;
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="content">
      <section className="profile">
        <div
          onClick={onAvatarPopup}
          alt="Аватар"
          className="profile__avatar"
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        />
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            onClick={onProfilePopup}
            className="profile__button profile__button_edit opacity"
            type="button"
          />
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button
          onClick={onAddPopup}
          className="profile__button profile__button_add opacity"
          type="button"
        />
      </section>
      <ul className="cards">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            link={card.link}
            name={card.name}
            likes={card.likes.length}
            card={card}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
            onCardClick={props.onCardClick}
          />
        ))}
      </ul>
    </div>
  );
}
