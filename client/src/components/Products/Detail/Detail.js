import { useState, useEffect, useContext } from "react";
import { Switch, Route, useHistory } from 'react-router-dom';
import { FetchContext } from "../../../context/FetchContext"
import { ProductContext } from "../../../context/ProductContext";
import { MdOutlineArrowBackIos } from "react-icons/md"
import Loading from "../../Common/Loading";
import DetailHeader from "./DetailHeader";

import MeterListing from './Listings/MeterListing';
import PremadeListing from './Listings/PremadeListing';
import PillowListing from "./Listings/PillowListing";
import TowelListing from "./Listings/TowelListing";

import './Detail.css';

function Detail({ category, productId }) {
    let history = useHistory();

    const fetchContext = useContext(FetchContext);
    const { setChildProducts } = useContext(ProductContext);

    const [isLoading, setIsLoading] = useState(true);

    function getListing() {
        switch (category) {
            case 'premade':
                return <PremadeListing />;
            case 'meter':
                return <MeterListing />;
            case 'pillow':
                return <PillowListing />;
            case 'towel':
                return <TowelListing />;
            default:
                return null;
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await fetchContext.authAxios.get(`/products/search/${category.toLocaleLowerCase()}/${productId}`);
                setChildProducts(data);
            } catch ({ response: {data: {message}} }) {
                console.log(message);
            }
            setIsLoading(false);
        }
        setIsLoading(true);
        fetchData();
    }, [productId, category]);

    return (
    isLoading ? <Loading /> :
    <div className='product-detail'>
        <div className='back' onClick={history.goBack}>
            <MdOutlineArrowBackIos/> Wróć do wyników wyszukiwania
        </div>
        <DetailHeader productId={productId} category={category}/>
        {getListing()}
    </div>
    );
}

export default Detail;