import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from "react";

export default function EditAvatarPopup(props) {
  const avatarRef = useRef();
  useEffect(() => {
    avatarRef.current.value = "";
  }, [props.opened]);

  function handleSubmit(e) {
    e.preventDefault();
    props.openEditAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      opened={props.opened}
      title="Обновить аватар"
      buttonText="Сохранить"
      closed={props.closed}
      onSubmit={handleSubmit}
    >
      <input
        className="form__input form__input_type_link"
        type="url"
        id="avatarLink"
        name="avatar"
        placeholder="Ссылка на картинку"
        required=""
        ref={avatarRef}
      />
      <span id="avatarLink-error" className="error" />
    </PopupWithForm>
  );
}
