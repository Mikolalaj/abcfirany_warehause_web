import CuttingPopup from './Popups/CuttingPopup';
import { useState, useEffect } from 'react';
import useAPI from '../../hooks/useAPI';

function AddCutting({ trigger, closePopup }) {
    const [cuttingErrorMessage, setCuttingErrorMessage] = useState('');
    const [state, , setRequestData, setIsReady] = useAPI('post', '/cutting', [], false);

    useEffect(() => {
        if (state.isSuccess) {
            console.log(state.data)
            closePopup();
        } else if (state.isError) {
            setCuttingErrorMessage(state.errorMessage);
        }
    }, [state]);

    async function addCutting(formData) {
        setRequestData(formData);
        setIsReady(true);
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