
import { useState, useEffect } from 'react';
import { unitsDict } from '../dicts';
import Listing, { ListingOptions } from '../components/Common/Listing';
import Loading from '../components/Common/Loading';
import SearchInput from '../components/Common/SearchInput';
import LacksIcons from '../components/Lacks/LacksIcons';
import AddLack from '../components/Lacks/AddLack';
import { MdAddCircle, MdRefresh } from 'react-icons/md';
import useAPI from '../hooks/useAPI';

function LacksPage() {    
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
    
    const [lacksList, setLacksList] = useState([]);
    const [lacksPopup, setLacksPopup] = useState(false);

    const [state, setUrl, , , , refresh] = useAPI('get', '/lacks', []);
    
    useEffect(() => {
        if (state.isSuccess) {
            state.data.forEach((lacks, index) => {state.data[index] = { ...lacks, amountWithUnit: lacks.amount + ' ' + unitsDict[lacks.unit] }})
            setLacksList(state.data)
        }
    }, [state.isSuccess])

    return (
    <>
        <AddLack
            trigger={lacksPopup}
            closePopup={() => setLacksPopup(false)}
            onSuccess={data => setLacksList([...lacksList, {
                ...data,
                amountWithUnit: data.amount + ' ' + unitsDict[data.unit]
            }])}
        />
        <div>
            <h1 style={{'marginBottom': '30px'}}>Dodane braki</h1>
            <SearchInput onSearch={(input) => { setUrl(`/lacks/${input}`); refresh() }}>Wyszukaj brak</SearchInput>
            <ListingOptions>
                <div onClick={() => setLacksPopup(true)}><MdAddCircle />Dodaj nowy brak</div>
                <div onClick={refresh}><MdRefresh />Odśwież</div>
            </ListingOptions>
            {state.isLoading
                ?
            <Loading />
                :
            <Listing data={lacksList} columns={columns} icons={<LacksIcons lacksList={lacksList} setLacksList={setLacksList} />} />
            }
        </div>
    </>
    )
}

export default LacksPage; 