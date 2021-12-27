
import { Redirect } from 'react-router-dom';
import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Logo from '../Logo/Logo';
import './login.css';

function Login() {
    const [isRightPanel, setRightPanel] = useState(true);
    const [redirectOnLogin, setRedirectOnLogin] = useState(false);

    return (
    <div>
    {redirectOnLogin && <Redirect to='/'/>}
    <div className={`container ${isRightPanel ? "" : "right-panel-active"}`} id="container">
        <div className="form-container sign-up-container">
            <RegisterForm setRedirectOnLogin={setRedirectOnLogin}/>
        </div>
        <div className="form-container sign-in-container">
            <LoginForm setRedirectOnLogin={setRedirectOnLogin}/>
        </div>
        <div className="overlay-container">
            <div className="overlay">
                <div className="overlay-panel overlay-left">
                    <h1>Magazyn <Logo /></h1>
                    <p>Stwórz nowe konto lub zaloguj się jeśli już je posiadasz</p>
                    <button className="ghost" onClick={() => setRightPanel(true)} id="signIn">Zaloguj się</button>
                </div>
                <div className="overlay-panel overlay-right">
                    <h1>Magazyn <Logo /></h1>
                    <p>Zaloguj się lub stwórz nowe konto</p>
                    <button className="ghost" onClick={() => setRightPanel(false)} id="signUp">Zarejestruj się</button>
                </div>
            </div>
        </div>
    </div>
    </div>
    );
}


export default Login;
