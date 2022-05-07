
import { useState, useEffect } from 'react';
import { unitsDict } from '../../dicts';
import YesNoPopup from '../Common/Popup/YesNoPopup';
import EditLack from './EditLack';
import { MdDelete, MdEdit } from 'react-icons/md';
import useAPI from '../../hooks/useAPI';

function LacksIcons({ data, lacksList, setLacksList }) {
    const [deletePopup, setDeletePopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    
    const [stateDelete,, setDeleteData, , setIsReady] = useAPI('delete', '/lacks', {}, false);

    function deleteLack() {
        setDeleteData({ lackId: data.lackId });
        setIsReady(true);
    }

    useEffect(() => {
        if (stateDelete.isSuccess) {
            let newList = lacksList.filter(lack => lack.lackId !== data.lackId);
            setLacksList(newList);
            setDeletePopup(false);
        }
    }, [stateDelete]);

    function updateLack(formData) {
        let newLacksList = lacksList.map(lack => {
            if (lack.lackId === formData.lackId) {
                lack.orderNumber = formData.orderNumber;
                lack.symbol = formData.symbol;
                lack.feature = formData.feature;
                lack.amount = formData.amount;
                lack.unit = formData.unit;
                lack.amountWithUnit = formData.amount + ' ' + unitsDict[formData.unit];
                lack.size = formData.size;
                lack.comments = formData.comments;
            }
            return lack;
        });
        setLacksList(newLacksList);
    }

    return (
    <>
        <YesNoPopup
            trigger={deletePopup}
            onYes={deleteLack}
            closePopup={() => {setDeletePopup(false)}}
            okButtonText='Usuń'
            message={`Czy na pewno chcesz usunąć ten brak (${data.orderNumber})?`}
        />
        <EditLack
            trigger={editPopup}
            closePopup={() => setEditPopup(false)}
            data={data}
            onSuccess={data => updateLack(data)}
        />
        <div className='icons'>
            <MdEdit className='edit' onClick={() => setEditPopup(true)} />
            <MdDelete className='delete' onClick={() => {setDeletePopup(true)}} />
        </div>
    </>
    )
}

export default LacksIcons;