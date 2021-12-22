
import axios from 'axios'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './login.css';

function Login(props) {
    const {register, handleSubmit, formState: { errors }} = useForm();
    
    const [loginText, setLoginText] = useState('');
    
    function onClick(data) {
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
                    setLoginText('Failed to login')
                }
                else {
                    props.setLogin(response.data);
                }
            })
    }
    
    if (props.ifLogin !== -1) {
        return <Redirect to='/'/>
    }
    else {
        return (
        <div className='form-container'>
            <h1>Hello!</h1>
            <h2 className='form-error'>{loginText}</h2>

            <form onSubmit={handleSubmit(onClick)}>
                <input
                    type='text'
                    placeholder='Username'
                    {...register("username", { required: true })}
                />
                {errors.username && <p>Login is required</p>}

                <input
                    type='password'
                    placeholder='Password'
                    {...register("password", { required: true })}
                />
                {errors.password && <p>Password is required</p>}

                <button type='submit'>Submit</button>
            </form>

            <p><Link to='/register'>Create new account</Link></p>
        </div>
        );
    }
}

export default Login;
