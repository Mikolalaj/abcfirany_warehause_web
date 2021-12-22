
import axios from 'axios'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './login.css';

function Register(props) {
    const {register, handleSubmit, formState: { errors }} = useForm();

    const [registered, setRegistered] = useState(false);
    const [registerText, setRegisterText] = useState('');

    function onClick(formData) {
        axios.get(`/users/checkUsername/${formData.username}`)
            .then(res => {
                if (res.data === true) {
                    setRegisterText('This username is taken :(');
                } else {
                    console.log(formData);
                    setRegisterText('');
                    axios({
                        method: 'post',
                        url: '/users/add/',
                        data: formData,
                        config: {
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            }
                        }
                    })
                        .then(response => {
                            if (response.data === true) {
                                setRegistered(true)
                            }
                            else {
                                setRegisterText('Failed to register')
                            }
                        })
                }
            })
            .catch(err => console.log(err))
    }

    if (props.ifLogin !== -1) {
        return <Redirect to='/' />
    }
    else if (registered === true) {
        return <Redirect to='/login' />
    }
    else {
        return (
            <div className='form-container'>
                <h1>Register</h1>
                <h2 className='form-error'>{registerText}</h2>

                <form onSubmit={handleSubmit(onClick)}>
                    <input
                        type='text'
                        placeholder='First Name'
                        {...register("firstName", { required: true })}
                    />
                    {errors.firstName && <p>First name is required</p>}

                    <input
                        type='text'
                        placeholder='Last Name'
                        {...register("lastName", { required: true })}
                    />
                    {errors.lastName && <p>Last name is required</p>}

                    <input
                        type='email'
                        placeholder='Email'
                        {...register("email", {
                            required: true,
                            pattern: /\S+@\S+\.\S+/
                        })}
                    />
                    {errors.email?.type === 'required' && <p>Email is required</p>}
                    {errors.email?.type === 'pattern' && <p>This is not a valid email</p>}

                    <input
                        type='text'
                        placeholder='Username'
                        {...register("username", { required: true })}
                    />
                    {errors.username && <p>Login is required</p>}

                    <input
                        type='password'
                        placeholder='Password'
                        {...register("password", {
                            required: true,
                            minLength: 8
                        })}
                    />
                    {errors.password?.type === 'required'  && <p>Password is required</p>}
                    {errors.password?.type === 'minLength'  && <p>Password is too short</p>}

                    <button type='submit'>Submit</button>
                </form>
                <p><Link to='/login'>Already have an account?</Link></p>
            </div>
        );
    }
}

export default Register;
