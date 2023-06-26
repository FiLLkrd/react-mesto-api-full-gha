import React from "react";

export default function PopupWithForm(props) {
  const { onSubmit, name, opened, closed, title, children, buttonText } = props;
  return (
    <div className={`popup popup_type_${name} ${opened ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__button popup__button_close"
          onClick={closed}
        />
        <h2 className="popup__title">{title}</h2>
        <form className="form" name={name} onSubmit={onSubmit} noValidate>
          <fieldset className="form__set">
            {children}
            <button
              type="submit"
              className="popup__button popup__button_submit"
            >
              {buttonText || "Сохранить"}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
