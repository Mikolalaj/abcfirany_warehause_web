import LoginForm from '../components/Login/LoginForm';
import '../components/Login/Login.css';

function Login() {

    return (
    <div className='login-page-container'>
        <div className='login-box'>
            <div className='sign-in-container'>
                <LoginForm />
            </div>
            <div className='info-container'>
                <h1>Magazyn abcfirany</h1>
                <p>Zaloguj się lub przejdź do sklepu</p>
                <div onClick={() => window.open('https://abcfirany.pl', '_blank')} className='link'>www.abcfirany.pl</div>
            </div>
    </div>
    </div>
    );
}


export default Login;
