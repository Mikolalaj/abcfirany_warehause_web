
import axios from 'axios'
import { publicFetch } from '../../utils/fetch';
import { useForm } from 'react-hook-form';
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function RegisterForm(props) {
    const {register, handleSubmit, formState: { errors }} = useForm();

    const authContext = useContext(AuthContext);

    const [failText, setFailText] = useState('');
    const [usernameText, setUsernameText] = useState('');
    const [emailText, setEmailText] = useState('');
    
    function onClickRegister(formData) {
        axios.get('/users/checkUsernameEmail/', { params: { username: formData.username, email: formData.email } })
            .then(async res => {
                if (res.data.username === false && res.data.email === false) {
                    setUsernameText('');
                    setEmailText('');

                    const { data } = await publicFetch.post('users/signup', formData);
                    if (typeof data.token === 'undefined') {
                        setFailText('Nie udało się zarejestrować')
                    }
                    else {
                        authContext.setAuthState(data);
                        props.setRedirectOnLogin(true);
                    }
                } else {
                    if (res.data.username) {
                        setUsernameText('Login jest już zajęty');
                    }
                    else {
                        setUsernameText('');
                    }

                    if (res.data.email) {
                        setEmailText('Email jest już zajęty');
                    }
                    else {
                        setEmailText('');
                    }
                }
            })
            .catch(err => console.log(err))
    }
    
    return (
    <form onSubmit={handleSubmit(onClickRegister)}>
        <h3>Utwórz nowe konto</h3>
        <input
            type='text'
            placeholder='Imie'
            {...register("firstName", { required: true })}
        />
        {errors.firstName && <p className='form-error'>Imię jest wymagane</p>}

        <input
            type='text'
            placeholder='Nazwisko'
            {...register("lastName", { required: true })}
        />
        {errors.lastName && <p className='form-error'>Nazwisko jest wymagane</p>}

        <input
            type='email'
            placeholder='Email'
            {...register("email", {
                required: true,
                pattern: /\S+@\S+\.\S+/
            })}
        />
        {errors.email?.type === 'required' && <p className='form-error'>Email jest wymagany</p>}
        {errors.email?.type === 'pattern' && <p className='form-error'>To nie jest prawidłowy email</p>}
        <p className='form-error'>{emailText}</p>

        <input
            type='text'
            placeholder='Login'
            {...register("username", { required: true })}
        />
        {errors.username && <p className='form-error'>Login jest wymagany</p>}
        <p className='form-error'>{usernameText}</p>

        <input
            type='password'
            placeholder='Hasło'
            {...register("password", {
                required: true,
                minLength: 8
            })}
        />
        {errors.password?.type === 'required'  && <p className='form-error'>Hasło jest wymagane</p>}
        {errors.password?.type === 'minLength'  && <p className='form-error'>Hasło jest za krótkie</p>}

        <button type='submit'>Zarejestruj się</button>

        <h2 className='form-fail'>{failText}</h2>
    </form>
    );
}

export default RegisterForm;
