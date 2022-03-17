
import { useState, useEffect, useContext } from 'react';
import { destinationsDict } from '../dicts';
import Listing from '../components/Common/Listing';
import Loading from '../components/Common/Loading';
import SearchInput from '../components/Common/SearchInput';
import YesNoPopup from '../components/Common/Popup/YesNoPopup';
import { CuttingContext, CuttingProvider } from '../context/CuttingContext';
import { MdDelete, MdEdit, MdAddCircle } from 'react-icons/md';
import AddCutting from '../components/Cutting/AddCutting';
import useAPI from '../hooks/useAPI';
import './CuttingPage.css'

function CuttingPage() {
    return (
        <CuttingProvider>
            <Cutting />
        </CuttingProvider>
    )
}


function Cutting() {    
    const columns = [
        {
            label: 'Data',
            size: 1,
            field: 'addDate'
        },
        {
            label: 'Nr zam.',
            size: 1,
            field: 'orderNumber'
        },
        {
            label: 'Docięte',
            size: 1,
            field: 'cuttingAmount'
        },
        {
            label: 'Do szycia',
            size: 1,
            field: 'sewingAmount'
        },
        {
            label: 'Miejsce',
            size: 1,
            field: 'destination'
        },
        {
            label: 'Uwagi',
            size: 6,
            field: 'comments'
        },
        {
            label: '',
            size: 1
        }
    ]
    
    const { cuttingList, setCuttingList } = useContext(CuttingContext);
    const [cuttingPopup, setCuttingPopup] = useState(false);

    const [state] = useAPI('get', '/cutting', []);
    
    useEffect(() => {
        if (state.isSuccess) {
            state.data.forEach((cutting, index) => {state.data[index] = { ...cutting, destination: destinationsDict[cutting.destination] }});
            setCuttingList(state.data);
        }
    }, [state.isSuccess]);

    return (
    <>
        <AddCutting
            trigger={cuttingPopup}
            closePopup={() => setCuttingPopup(false)}
            onSuccess={data => setCuttingList([...cuttingList, {
                addDate: data.addDate,
                orderNumber: data.orderNumber,
                cuttingAmount: data.cuttingAmount,
                sewingAmount: data.sewingAmount,
                destination: destinationsDict[data.destination],
                comments: data.comments
            }]) }
        />
        {state.isLoading ? <Loading /> :
        <div>
            <h1>Dodane metry</h1>
            <SearchInput onSearch={(e) => console.log(e)}>Wyszukaj metry</SearchInput>
            <div className='add-cutting' onClick={() => setCuttingPopup(true)}><MdAddCircle />Dodaj nowe metry</div>
            <Listing data={cuttingList} columns={columns} icons={<CuttingIcons />} />
        </div>
        }
    </>
    )
}

function CuttingIcons({ data }) {
    const [deletePopup, setDeletePopup] = useState(false);
    const { cuttingList, setCuttingList } = useContext(CuttingContext);

    const [stateDelete,, setDeleteData, setIsReady] = useAPI('delete', '/cutting', {}, false);
    // const [stateEdit] = useAPI('put', '/cutting', {}, false);

    function deleteCutting() {
        setDeleteData({ cuttingId: data.cuttingId });
        setIsReady(true);
    }

    useEffect(() => {
        if (stateDelete.isSuccess) {
            let newList = cuttingList.filter(cutting => cutting.cuttingId !== data.cuttingId);
            setCuttingList(newList);
            setDeletePopup(false);
        }
    }, [stateDelete]);

    function editCutting() {
        console.log('edit')
        console.log(data)
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
        <div className='icons'>
            <MdEdit className='edit' onClick={editCutting} />
            <MdDelete className='delete' onClick={() => {setDeletePopup(true)}} />
        </div>
    </>
    )
}

export default CuttingPage; 