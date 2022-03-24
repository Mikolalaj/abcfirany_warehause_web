
import { useState, useEffect, useContext } from 'react';
import { destinationsDict } from '../dicts';
import Listing from '../components/Common/Listing';
import Loading from '../components/Common/Loading';
import SearchInput from '../components/Common/SearchInput';
import { CuttingContext, CuttingProvider } from '../context/CuttingContext';
import CuttingIcons from '../components/Cutting/CuttingIcons';
import AddCutting from '../components/Cutting/AddCutting';
import { MdAddCircle, MdRefresh } from 'react-icons/md';
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

    const [state, setUrl, , , refresh] = useAPI('get', '/cutting', []);
    
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
        <div>
            <h1>Dodane metry</h1>
            <SearchInput onSearch={(input) => { setUrl(`/cutting/${input}`); refresh() }}>Wyszukaj metry</SearchInput>
            <div className='cutting-options'>
                <div onClick={() => setCuttingPopup(true)}><MdAddCircle />Dodaj nowe metry</div>
                <div onClick={refresh}><MdRefresh />Odśwież</div>
            </div>
            {state.isLoading
                ?
            <Loading />
                :
            <Listing data={cuttingList} columns={columns} icons={<CuttingIcons />} />
            }
        </div>
    </>
    )
}

export default CuttingPage; 