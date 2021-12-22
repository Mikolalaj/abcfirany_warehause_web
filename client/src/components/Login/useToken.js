import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('loginToken');
        const userToken = JSON.parse(tokenString);
        if (typeof(userToken) === 'string' && userToken !== '') {
            return userToken;
        }
        else {
            return -1;
        }
    };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        localStorage.setItem('loginToken', JSON.stringify(userToken));
        setToken(userToken);
    };

    return {
        token,
        setToken: saveToken
    }
}