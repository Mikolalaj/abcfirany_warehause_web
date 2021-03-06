
import { publicFetch } from '../../utils/fetch';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function LoginForm() {
    const history = useHistory();
    const {register, handleSubmit, formState: { errors }} = useForm();

    const authContext = useContext(AuthContext);
    
    const [failText, setFailText] = useState('');
    
    async function onClickLogin(formData) {
        try {
            const { data } = await publicFetch.post('users/auth', formData);
            authContext.setAuthState(data);
            history.push('/dashboard');
        } catch ({ response: {data: {message}} }) {
            setFailText(message)
        }
    }
    
    return (
    <form className='login-form' onSubmit={handleSubmit(onClickLogin)}>
        <h1>Zaloguj się</h1>
        <input
            type='text'
            placeholder='Login'
            {...register('username', { required: true })}
        />
        {errors.username && <p className='form-error'>Login jest wymagany</p>}

        <input
            type='password'
            placeholder='Hasło'
            {...register('password', { required: true })}
        />
        {errors.password && <p className='form-error'>Hasło jest wymagane</p>}

        <button type='submit'>Zaloguj</button>

        <h2 className='form-fail'>{failText}</h2>
    </form>
    );
}

export default LoginForm;
