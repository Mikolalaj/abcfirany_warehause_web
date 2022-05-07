import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import useAPI from '../../../hooks/useAPI';
import { ProductContext } from '../../../context/ProductContext';
import { MdOutlineArrowBackIos } from 'react-icons/md'
import Loading from '../../Common/Loading';
import DetailHeader from './DetailHeader';
import ProductsEnum from '../ProductsEnum';
import { useParams } from 'react-router-dom';

import ManageIcons from './ManageIcons';
import Listing from '../../Common/Listing';
import { MeterColumns, PillowColumns, PremadeColumns, TowelColumns } from './ListingColumns';

import './Detail.css';

function Detail() {
    const { category, productId } = useParams();
    let history = useHistory();

    const { childProducts, setChildProducts, setProduct } = useContext(ProductContext);

    function getColumns() {
        if (category === ProductsEnum.premade) { return PremadeColumns }
        if (category === ProductsEnum.pillow) { return PillowColumns }
        if (category === ProductsEnum.meter) { return MeterColumns }
        if (category === ProductsEnum.towel) { return TowelColumns }
    }

    // Parent product data
    const [stateParent] = useAPI('get', `/products/details/${productId}`, {});
    useEffect(() => {
        if (stateParent.isSuccess) {
            setProduct({
                symbol: stateParent.data.symbol,
                comments: stateParent.data.comments,
                sale: stateParent.data.sale,
                img: stateParent.data.img,
                features: stateParent.data.features,
                productId,
                category
            })
        }
    }, [stateParent, setProduct, productId, category]);

    // Child product data
    const [stateChild, setChildProductsUrl,,,, refreshChildProducts] = useAPI('get', `/products/${category}/search/${productId}`, []);
    useEffect(() => {
        if (stateChild.isSuccess) {
            setChildProducts(stateChild.data);
        }
    }, [stateChild, setChildProducts]);

    return (
    (stateChild.isLoading && stateParent.isLoading) ? <Loading /> :
    <div className='product-detail'>
        <div className='back' onClick={history.goBack}>
            <MdOutlineArrowBackIos/> Wróć do wyników wyszukiwania
        </div>
        {stateParent.isLoading ? <Loading /> :
        <DetailHeader changeCategory={(category) => {setChildProductsUrl(`/products/${category}/search/${productId}`); refreshChildProducts()}} />}
        {stateChild.isLoading ? <Loading /> :
        <Listing columns={getColumns()} data={childProducts} icons={<ManageIcons />} />}
    </div>
    );
}

export default Detail;