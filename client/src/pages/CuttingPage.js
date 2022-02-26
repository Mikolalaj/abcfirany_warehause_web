
import { useEffect, useState, useContext } from 'react';
import { FetchContext } from '../context/FetchContext';
import { destinationsDict } from '../dicts';
import Listing from '../components/Common/Listing';
import { MdDelete, MdEdit } from 'react-icons/md';

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

    const [cuttingData, setCuttingData] = useState([]);
    const { authAxios } = useContext(FetchContext);

    useEffect(() => {
        async function getCuttingData() {
            let { data } = await authAxios.get('/cutting');
            data.forEach((cutting, index) => {data[index] = { ...cutting, destination: destinationsDict[cutting.destination] }});
            setCuttingData(data);
        }
        getCuttingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <h1>Dodane metry</h1>
            <Listing data={cuttingData} columns={columns} icons={CuttingIcons} />
        </div>
    )
}

function CuttingIcons({ data }) {
    return (
        <div className='icons'>
            <MdEdit className='edit' />
            <MdDelete className='delete' />
        </div>
    )
}

export default Cutting;