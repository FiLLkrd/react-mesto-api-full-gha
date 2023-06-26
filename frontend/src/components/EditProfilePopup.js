import PopupWithForm from "./PopupWithForm";
import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleName(e) {
    setName(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.opened]);

  function handleSubmit(e) {
    e.preventDefault();
    props.editUserInfo({ name: name, about: description });
  }

  return (
    <PopupWithForm
      name="profile"
      opened={props.opened}
      title="Редактировать профиль"
      buttonText="Сохранить"
      closed={props.closed}
      onSubmit={handleSubmit}
    >
      <input
        className="form__input form__input_type_name"
        type="text"
        id="editName"
        name="name"
        value={name || ""}
        minLength={2}
        maxLength={40}
        required=""
        onChange={handleName}
      />
      <span id="editName-error" className="error" />
      <input
        className="form__input form__input_type_job"
        type="text"
        id="editJob"
        name="job"
        value={description || ""}
        minLength={2}
        maxLength={200}
        required=""
        onChange={handleDescription}
      />
      <span id="editJob-error" className="error" />
    </PopupWithForm>
  );
}
