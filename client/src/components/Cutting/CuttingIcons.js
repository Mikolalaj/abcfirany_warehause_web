
import { useState, useEffect } from 'react';
import { destinationsDict } from '../../dicts';
import YesNoPopup from '../Common/Popup/YesNoPopup';
import EditCutting from './EditCutting';
import { MdDelete, MdEdit } from 'react-icons/md';
import useAPI from '../../hooks/useAPI';

function CuttingIcons({ data, cuttingList, setCuttingList }) {
    const [deletePopup, setDeletePopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);

    const [stateDelete,, setDeleteData, , setIsReady] = useAPI('delete', '/cutting', {}, false);

    function deleteCutting() {
        setDeleteData({ cuttingId: data.cuttingId });
        setIsReady(true);
    }

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    useEffect(() => {
        if (stateDelete.isSuccess) {
            let newList = cuttingList.filter(cutting => cutting.cuttingId !== data.cuttingId);
            setCuttingList(newList);
            setDeletePopup(false);
        }
    }, [stateDelete]);

    function updateCutting(formData) {
        let newCuttingList = cuttingList.map(cutting => {
            if (cutting.cuttingId === formData.cuttingId) {
                cutting.orderNumber = formData.orderNumber;
                cutting.cuttingAmount = formData.cuttingAmount;
                cutting.sewingAmount = formData.sewingAmount;
                cutting.destination = destinationsDict[formData.destination];
                cutting.comments = formData.comments;
            }
            return cutting;
        });
        setCuttingList(newCuttingList);
    }

    return (
    <>
        <YesNoPopup
            trigger={deletePopup}
            onYes={deleteCutting}
            closePopup={() => {setDeletePopup(false)}}
            okButtonText='Usuń'
            message={`Czy na pewno chcesz usunąć metry (${data.orderNumber})?`}
        />
        <EditCutting
            trigger={editPopup}
            closePopup={() => setEditPopup(false)}
            data={{...data, destination: {label: data.destination, value: getKeyByValue(destinationsDict, data.destination)}}}
            onSuccess={data => updateCutting(data)}
        />
        <div className='icons'>
            <MdEdit className='edit' onClick={() => setEditPopup(true)} />
            <MdDelete className='delete' onClick={() => {setDeletePopup(true)}} />
        </div>
    </>
    )
}

export default CuttingIcons;