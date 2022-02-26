import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FetchContext } from '../../../context/FetchContext'
import { ProductContext } from '../../../context/ProductContext';
import { MdOutlineArrowBackIos } from 'react-icons/md'
import Loading from '../../Common/Loading';
import DetailHeader from './DetailHeader';
import ProductsEnum from '../ProductsEnum';

import ManageIcons from './ManageIcons';
import Listing from '../../Common/Listing';
import { MeterColumns, PillowColumns, PremadeColumns, TowelColumns } from './ListingColumns';

import './Detail.css';

function Detail({ category, productId }) {
    let history = useHistory();

    const fetchContext = useContext(FetchContext);
    const { childProducts, setChildProducts, setProduct } = useContext(ProductContext);

    const [isLoadingChild, setIsLoadingChild] = useState(true);
    const [isLoadingParent, setIsLoadingParent] = useState(true);

    function getColumns() {
        if (category === ProductsEnum.premade) { return PremadeColumns }
        if (category === ProductsEnum.pillow) { return PillowColumns }
        if (category === ProductsEnum.meter) { return MeterColumns }
        if (category === ProductsEnum.towel) { return TowelColumns }
    }

    // Parent product data
    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await fetchContext.authAxios.get(`/products/details/${productId}`);
                setProduct({
                    symbol: data.symbol,
                    comments: data.comments,
                    sale: data.sale,
                    img: data.img,
                    features: data.features,
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
        <Listing columns={getColumns()} data={childProducts} icons={<ManageIcons />} />
    </div>
    );
}

export default Detail;