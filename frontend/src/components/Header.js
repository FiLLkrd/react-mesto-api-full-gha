import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import HeaderLogo from "../images/header-logo.svg";

export default function Header(props) {
  const {userEmail, onSignExit} = props;
  return (
    <div className="header">
      <div>
      <img src={HeaderLogo} alt="Логотип" className="header__logo" />
      </div>
      <div className="header__sign">
        <Routes>
          <Route path="sign-in" element={<Link to="/sign-up" className="header__link" >Регистрация</Link>}/>
          <Route path="sign-up" element={<Link to="/sign-in" className="header__link" >Войти</Link>}/>
          <Route path="/" element={
          <>
          <p className="header__email">{userEmail}</p>
          <Link to="/sign-in" className="header__link" onClick={onSignExit}>Выйти</Link>
          </>
          }/>
        </Routes>
      </div>
    </div>
  );
}
