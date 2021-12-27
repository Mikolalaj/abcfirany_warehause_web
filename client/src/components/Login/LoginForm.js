
import { publicFetch } from '../../utils/fetch';
import { useForm } from 'react-hook-form';
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function LoginForm(props) {
    const {register, handleSubmit, formState: { errors }} = useForm();

    const authContext = useContext(AuthContext);
    
    const [failText, setFailText] = useState('');
    
    async function onClickLogin(formData) {
        const { data } = await publicFetch.post('users/auth', formData);
        if (typeof data.token === 'undefined') {
            setFailText('Niepoprawny login lub hasło')
        }
        else {
            authContext.setAuthState(data);
            props.setRedirectOnLogin(true);
        }
    }
    
    return (
    <form onSubmit={handleSubmit(onClickLogin)}>
        <h3>Zaloguj się</h3>
        <input
            type='text'
            placeholder='Login'
            {...register("username", { required: true })}
        />
        {errors.username && <p className='form-error'>Login jest wymagany</p>}

        <input
            type='password'
            placeholder='Hasło'
            {...register("password", { required: true })}
        />
        {errors.password && <p className='form-error'>Hasło jest wymagane</p>}

        <button type='submit'>Zaloguj</button>

        <h2 className='form-fail'>{failText}</h2>
    </form>
    );
}

export default LoginForm;
