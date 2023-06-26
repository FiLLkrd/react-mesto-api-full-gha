import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";

export default function Register (props) {
    const {onSubmit} = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        const authForm = {
            email,password
        }
        onSubmit(authForm)
    }, [email,password,onSubmit])

    return(
        <form className="sign__form" onSubmit={handleSubmit}>
            <h2 className="sing__title">Регистрация</h2>
            <input
            className="sign__input"
            placeholder="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <input 
            className="sign__input" 
            placeholder="Пароль" 
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
                <button 
                className="sign__button" 
                type="submit">Зарегистрироваться</button>
            <p className="sign__text">Уже зарегистрированы?
            <Link to="/sign-in" className="sign__link"> Войти</Link></p>
        </form>
    );
}