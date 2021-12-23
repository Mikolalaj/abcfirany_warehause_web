
import axios from 'axios'
import { useForm } from 'react-hook-form';
import { useState } from 'react';

function LoginForm(props) {
    const {register, handleSubmit, formState: { errors }} = useForm();
    
    const [failText, setFailText] = useState('');
    
    function onClickLogin(data) {
        axios({
            method: 'post',
            url: '/users/auth/',
            data: data,
            config: {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        })
            .then(response => {
                if (response.data === '') {
                    setFailText('Niepoprawny login lub hasło')
                }
                else {
                    props.setLogin(response.data);
                }
            })
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
