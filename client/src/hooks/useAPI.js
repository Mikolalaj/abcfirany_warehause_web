import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
  
function dataFetchReducer(state, action) {
    switch (action.type) {
        case 'FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess: false
            };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSuccess: true,
                data: action.payload,
            };
        case 'FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
                isSuccess: false
            };
        default:
            throw new Error();
    }
};
  
const useAPI = (method, initialUrl, initialData) => {
    const [csrfToken, setCsrfToken] = useState('');
    const [url, setUrl] = useState(initialUrl);

    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: false,
        isError: false,
        isSuccess: false,
        data: initialData,
    });

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        async function getCsrfToken() {
            try {
                const { data } = await axios.get('/api/csrf-token', { cancelToken: source.token });
                setCsrfToken(data.csrfToken);
            } catch (error) {
                if (axios.isCancel(error)) { }
                else {
                    throw error;
                }
            }
        }
        getCsrfToken();

        return () => {
            source.cancel();
        };

    }, []);

    useEffect(() => {
        let didCancel = false;

        async function fetchData() {
            dispatch({ type: 'FETCH_INIT' });

            try {
                const result = await axios(url, {
                    method: method,
                    baseURL: process.env.REACT_APP_API_URL,
                    credentials: 'include',
                    withCredentials: true,
                    headers: { 'X-CSRF-TOKEN': csrfToken }
                });

                if (!didCancel) {
                    dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
                }
            } catch (error) {
                if (!didCancel) {
                    dispatch({ type: 'FETCH_FAILURE' });
                }
            }
        };

        fetchData();

        return () => {
            didCancel = true;
        };

    }, [url]);

    return [state, setUrl];
};

export default useAPI