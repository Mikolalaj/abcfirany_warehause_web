import LacksPopup from './Popups/LacksPopup';
import { useState, useEffect } from 'react';
import useAPI from '../../hooks/useAPI';

function AddLack({ trigger, closePopup, onSuccess }) {
    const [lacksErrorMessage, setLacksErrorMessage] = useState('');
    const [state, , setRequestData, setIsReady] = useAPI('post', '/lacks', {}, false);

    async function addLacks(formData) {
        setRequestData(formData);
        setIsReady(true);
    }

    useEffect(() => {
        if (state.isSuccess) {
            if (onSuccess) { onSuccess(state.data) }
            closePopup();
        }
        else if (state.isError) {
            setLacksErrorMessage(state.errorMessage);
        }
    }, [state]);

    return (
    <LacksPopup 
        trigger={trigger}
        closePopup={closePopup}
        onYes={addLacks}
        okButtonText='Dodaj'
        labelText='Dodaj brak'
        errorMessage={lacksErrorMessage}
    />
    )
}

export default AddLack;