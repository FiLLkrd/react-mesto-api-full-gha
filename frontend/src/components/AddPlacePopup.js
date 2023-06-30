import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";

export default function AddPlacePopup(props) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  useEffect(() => {
    setTitle("");
    setLink("");
  }, [props.opened]);

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    props.openAddPlace({
      title,
      link,
    });
  }

  return (
    <PopupWithForm
      name="add-card"
      opened={props.opened}
      title="Новое место"
      buttonText="Сохранить"
      closed={props.closed}
      onSubmit={handleAddPlaceSubmit}
    >
      <input
        className="form__input form__input_type_title"
        type="text"
        id="addNameCard"
        name="title"
        placeholder="Название"
        minLength={2}
        maxLength={30}
        required=""
        onChange={handleChangeTitle}
        value={title}
      />
      <span id="addNameCard-error" className="error" />
      <input
        className="form__input form__input_type_link"
        type="url"
        id="addLinkCard"
        name="url"
        placeholder="Ссылка на картинку"
        required=""
        onChange={handleChangeLink}
        value={link}
      />
      <span id="addLinkCard-error" className="error" />
    </PopupWithForm>
  );
}


