
import { useState, useEffect } from 'react';
import { destinationsDict } from '../dicts';
import Listing from '../components/Common/Listing';
import { MdDelete, MdEdit } from 'react-icons/md';
import useAPI from '../hooks/useAPI';

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

    const [state] = useAPI('get', '/cutting', []);

    useEffect(() => {
        if (state.isSuccess) {
            state.data.forEach((cutting, index) => {state.data[index] = { ...cutting, destination: destinationsDict[cutting.destination] }});
            setCuttingData(state.data);
        }
    }, [state]);

    return (
        <div>
            <h1>Dodane metry</h1>
            <Listing data={cuttingData} columns={columns} icons={CuttingIcons} />
        </div>
    )
}

function CuttingIcons({ cuttingData }) {
    return (
        <div className='icons'>
            <MdEdit className='edit' />
            <MdDelete className='delete' />
        </div>
    )
}

export default Cutting;