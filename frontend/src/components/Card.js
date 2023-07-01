import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Card(props) {
  const { name, link, likes } = props;
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const liked = props.card.likes.some(id => id === currentUser._id);

  const cardLikeAddActiveClass = `card__like ${liked && "card__like_active"}`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="card">
      <img
        alt={name}
        className="card__image"
        src={link}
        onClick={handleClick}
      />
      {isOwn && (
        <button
          className="card__trash"
          type="button"
          onClick={handleDeleteClick}
        />
      )}
      <div className="card__signature">
        <h2 className="card__title">{name}</h2>
        <div>
          <button
            type="button"
            className={cardLikeAddActiveClass}
            onClick={handleLikeClick}
          />
          <p className="card__number-counter">{likes}</p>
        </div>
      </div>
    </article>
  );
}
