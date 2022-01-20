import { useState, useEffect, useContext } from "react";
import { FetchContext } from "../../../context/FetchContext"
import { SearchContext } from "../../../context/SearchContext";
import { MdOutlineArrowBackIos } from "react-icons/md"
import Loading from "../../Common/Loading";
import DetailHeader from "./DetailHeader";
import DetailMeter from './DetailMeter';
import DetailPremade from './DetailPremade';
import DetailPillow from "./DetailPillow";
import DetailTowel from "./DetailTowel";
import './Detail.css';

function Detail(props) {
    const { symbol, productId, comments, sale, img, category } = props;
    const fetchContext = useContext(FetchContext);
    const searchContext = useContext(SearchContext);

    const [products, setProducts] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true);

    function getDetail() {
        switch (category) {
            case 'Premade':
                return <DetailPremade symbol={symbol} products={products}/>;
            case 'Meter':
                return <DetailMeter symbol={symbol} products={products} />;
            case 'Pillow':
                return <DetailPillow symbol={symbol} products={products} />;
            case 'Towel':
                return <DetailTowel symbol={symbol} products={products} />;
            default:
                return null;
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
        <div className='back' onClick={()=>searchContext.setSearchResults(true)}>
            <MdOutlineArrowBackIos/> Wróć do wyników wyszukiwania
        </div>
        <DetailHeader symbol={symbol} comments={comments} sale={sale} img={img}/>
        {getDetail()}
    </div>
    );
}

export default Detail;