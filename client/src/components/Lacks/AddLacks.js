import LacksPopup from './Popups/LacksPopup';
import { FetchContext } from '../../context/FetchContext';
import { useState, useContext } from 'react';

function AddLacks({ trigger, closePopup }) {
    const [lacksErrorMessage, setLacksErrorMessage] = useState('');
    // const { authAxios } = useContext(FetchContext);

    async function addLacks(formData) {
        console.log(formData);
        // try {
        //     const { data } = await authAxios.post('/cutting/add', formData);
        //     if (data[0]) {
        //         closePopup();
        //     }
        //     else {
        //         setCuttingErrorMessage('Wystąpił błąd podczas dodawania metrów');
        //     }
        // } catch ({ response: { data: { message } } }) {
        //     setCuttingErrorMessage(message)
        // }
    }

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

export default AddLacks;