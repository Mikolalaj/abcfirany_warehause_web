import React, { createContext, useEffect } from 'react';
import axios from 'axios';

const FetchContext = createContext();
const { Provider } = FetchContext;

const FetchProvider = ({ children }) => {
    const authAxios = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        credentials: 'include',
        withCredentials: true
    });

    useEffect(() => {
        async function getCsrfToken() {
            const { data } = await authAxios.get('/csrf-token');
            authAxios.defaults.headers['X-CSRF-TOKEN'] = data.csrfToken;
        }
        getCsrfToken();
    }, []);

    return (
        <Provider value={{authAxios}}>
            {children}
        </Provider>
    );
};

export { FetchContext, FetchProvider };