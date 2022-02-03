import CuttingPopup from './Popups/CuttingPopup';
import { FetchContext } from '../../context/FetchContext';
import { useState, useContext } from 'react';

function AddCutting({ trigger, closePopup }) {
    const [cuttingErrorMessage, setCuttingErrorMessage] = useState('');
    const { authAxios } = useContext(FetchContext);

    async function addCutting(formData) {
        try {
            const { data } = await authAxios.post('/cutting/add', formData);
            if (data[0]) {
                closePopup();
            }
            else {
                setCuttingErrorMessage('Wystąpił błąd podczas dodawania metrów');
            }
        } catch ({ response: { data: { message } } }) {
            setCuttingErrorMessage(message)
        }
    }

    return (
    <CuttingPopup 
        trigger={trigger}
        closePopup={closePopup}
        onYes={addCutting}
        okButtonText='Dodaj'
        labelText='Dodaj metry'
        errorMessage={cuttingErrorMessage}
    />
    )
}

export default AddCutting;