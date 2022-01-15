import { useState, useEffect, useContext } from "react";
import { FetchContext } from "../../../context/FetchContext"
import Loading from "../../Common/Loading";
import './Detail.css';
import DetailMeter from './DetailMeter';
import DetailPremade from './DetailPremade';

function Detail({ productId, category }) {
    const fetchContext = useContext(FetchContext);

    const [products, setProducts] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true);

    function getDetail() {
        switch (category) {
            case 'Premade':
                return <DetailPremade products={products}/>;
            case 'Meter':
                return <DetailMeter products={products} />;
            // case 'Pillow':
            //     return <DetailPillow products={products} />;
            // case 'Towel':
            //     return <DetailTowel products={products} />;
            // default:
            //     return null;
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await fetchContext.authAxios.get(`/products/search/${category.toLocaleLowerCase()}/${productId}`);
                setProducts(data);
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
        {getDetail()}
    </div>
    );
}

export default Detail;