import { useState } from 'react';
import LoginForm from '../components/Login/LoginForm';
import RegisterForm from '../components/Login/RegisterForm';
import '../components/Login/Login.css';

function Login() {
    const [isRightPanel, setRightPanel] = useState(true);

    return (
    <div className={`login-box ${isRightPanel ? '' : 'right-panel-active'}`}>
        <div className='form-container sign-up-container'>
            <RegisterForm />
        </div>
        <div className='form-container sign-in-container'>
            <LoginForm />
        </div>
        <div className='overlay-container'>
            <div className='overlay'>
                <div className='overlay-panel overlay-left'>
                    <h1>Magazyn abcfirany</h1>
                    <p>Stwórz nowe konto lub zaloguj się jeśli już je posiadasz</p>
                    <button className='ghost' onClick={() => setRightPanel(true)}>Zaloguj się</button>
                </div>
                <div className='overlay-panel overlay-right'>
                    <h1>Magazyn abcfirany</h1>
                    <p>Zaloguj się lub stwórz nowe konto</p>
                    <button className='ghost' onClick={() => setRightPanel(false)}>Zarejestruj się</button>
                </div>
            </div>
        </div>
    </div>
    );
}


export default Login;
