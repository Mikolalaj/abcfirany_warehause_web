import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FetchContext } from '../../../context/FetchContext'
import { ProductContext } from '../../../context/ProductContext';
import { MdOutlineArrowBackIos } from 'react-icons/md'
import Loading from '../../Common/Loading';
import DetailHeader from './DetailHeader';

import MeterListing from './Listings/MeterListing';
import PremadeListing from './Listings/PremadeListing';
import PillowListing from './Listings/PillowListing';
import TowelListing from './Listings/TowelListing';

import './Detail.css';

function Detail({ category, productId }) {
    let history = useHistory();

    const fetchContext = useContext(FetchContext);
    const { setChildProducts, setProduct } = useContext(ProductContext);

    const [isLoadingChild, setIsLoadingChild] = useState(true);
    const [isLoadingParent, setIsLoadingParent] = useState(true);

    function getListing() {
        switch (category) {
            case 'premade':
                return <PremadeListing />;
            case 'meter':
                return <MeterListing />;
            case 'pillows':
                return <PillowListing />;
            case 'towels':
                return <TowelListing />;
            default:
                return null;
        }
    }

    // Parent product data
    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await fetchContext.authAxios.get(`/products/details/${productId}`);
                setProduct({
                    symbol: data[0].symbol,
                    comments: data[0].comments,
                    sale: data[0].sale,
                    img: data[0].img,
                    productId: productId,
                    category: category,
                })
                setIsLoadingParent(false);
            } catch ({ response: {data: {message}} }) {
                console.log(message);
            }
        }
        setIsLoadingParent(true);
        fetchData();
    }, [productId]);

    // Child product data
    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await fetchContext.authAxios.get(`/products/${category.toLocaleLowerCase()}/search/${productId}`);
                setChildProducts(data);
            } catch ({ response: {data: {message}} }) {
                console.log(message);
            }
            setIsLoadingChild(false);
        }
        setIsLoadingChild(true);
        fetchData();

    }, [productId, category]);

    return (
    (isLoadingChild || isLoadingParent) ? <Loading /> :
    <div className='product-detail'>
        <div className='back' onClick={history.goBack}>
            <MdOutlineArrowBackIos/> Wróć do wyników wyszukiwania
        </div>
        <DetailHeader />
        {getListing()}
    </div>
    );
}

export default Detail;