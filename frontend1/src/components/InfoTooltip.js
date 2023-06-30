import React from "react";
import UnionComplet from "../images/UnionComplet.png";
import UnionError from "../images/UnionError.png";

export default function InfoTooltip(props) {
  const { name, opened, closed, status } = props;
  const image = status === "accept" ? UnionComplet : UnionError;

  return (
    <div className={`popup popup_type_${name} ${opened ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__button popup__button_close"
          onClick={closed}
        />
        <form className="popup__form" name={name} id={name}>
          <img className="popup__img" src={image} alt={status} />
          <p className="popup__text">
            {status === "accept"
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте еще раз."}
          </p>
        </form>
      </div>
    </div>
  );
}
