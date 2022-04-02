
import { useState, useEffect, useContext } from 'react';
import { unitsDict } from '../dicts';
import Listing, { ListingOptions } from '../components/Common/Listing';
import Loading from '../components/Common/Loading';
import SearchInput from '../components/Common/SearchInput';
// import { CuttingContext, CuttingProvider } from '../context/CuttingContext';
import LacksIcons from '../components/Lacks/LacksIcons';
import AddLacks from '../components/Lacks/AddLacks';
import { MdAddCircle, MdRefresh } from 'react-icons/md';
import useAPI from '../hooks/useAPI';

function LacksPage() {
    return (
        // <CuttingProvider>
            <Lacks />
        // </CuttingProvider>
    )
}

function Lacks() {    
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
            label: 'Symbol',
            size: 1,
            field: 'symbol'
        },
        {
            label: 'Cecha',
            size: 1,
            field: 'feature'
        },
        {
            label: 'Wymiar',
            size: 1,
            field: 'size'
        },
        {
            label: 'Ilość',
            size: 1,
            field: 'amountWithUnit'
        },
        {
            label: 'Uwagi',
            size: 5,
            field: 'comments'
        },
        {
            label: '',
            size: 1
        }
    ]
    
    const [lacksList, setCuttingList] = useState([]);
    const [lacksPopup, setCuttingPopup] = useState(false);

    const [state, setUrl, , , refresh] = useAPI('get', '/lacks', []);
    
    useEffect(() => {
        if (state.isSuccess) {
            state.data.forEach((lacks, index) => {state.data[index] = { ...lacks, amountWithUnit: lacks.amount + ' ' + unitsDict[lacks.unit] }})
            setCuttingList(state.data)
        }
    }, [state.isSuccess])

    return (
    <>
        <AddLacks
            trigger={lacksPopup}
            closePopup={() => setCuttingPopup(false)}
            onSuccess={data => setCuttingList([...lacksList, {
                ...data,
                amount: data.amount + ' ' + unitsDict[data.unit]
            }]) }
        />
        <div>
            <h1 style={{'marginBottom': '30px'}}>Dodane braki</h1>
            <SearchInput onSearch={(input) => { setUrl(`/lacks/${input}`); refresh() }}>Wyszukaj brak</SearchInput>
            <ListingOptions>
                <div onClick={() => setCuttingPopup(true)}><MdAddCircle />Dodaj nowy brak</div>
                <div onClick={refresh}><MdRefresh />Odśwież</div>
            </ListingOptions>
            {state.isLoading
                ?
            <Loading />
                :
            <Listing data={lacksList} columns={columns} icons={<LacksIcons />} />
            }
        </div>
    </>
    )
}

export default LacksPage; 