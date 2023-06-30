import React from "react";

export default function ImagePopup(props) {
  const { name, opened, closed, card } = props;
  return (
    <div className={`popup popup_type_${name} ${opened ? "popup_opened" : ""}`}>
      <div className="popup__full">
        <button
          type="button"
          className="popup__button popup__button_close opacity"
          onClick={closed}
        />
        <img src={card.link} className="popup__image" alt={card.name} />
        <p className="popup__caption">{card.name}</p>
      </div>
    </div>
  );
}
