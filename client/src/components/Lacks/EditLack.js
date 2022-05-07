import LacksPopup from './Popups/LacksPopup';
import { useState, useEffect } from 'react';
import useAPI from '../../hooks/useAPI';

function EditLack({ trigger, closePopup, onSuccess, data }) {
    const [lacksErrorMessage, setLacksErrorMessage] = useState('');
    const [state, , setRequestData, , setIsReady] = useAPI('put', '/lacks', {}, false);

    async function addLacks(formData) {
        setRequestData({...formData, lackId: data.lackId});
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
        okButtonText='Edytuj'
        labelText='Edytuj brak'
        errorMessage={lacksErrorMessage}
        lacksData={data}
    />
    )
}

export default EditLack;