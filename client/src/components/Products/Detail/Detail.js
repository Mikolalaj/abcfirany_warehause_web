import { useState, useEffect, useContext } from "react";
import { FetchContext } from "../../../context/FetchContext"
import { SearchContext } from "../../../context/SearchContext";
import { ProductProvider } from "../../../context/ProductContext";
import { MdOutlineArrowBackIos } from "react-icons/md"
import Loading from "../../Common/Loading";
import DetailHeader from "./DetailHeader";
import DetailMeter from './DetailMeter';
import DetailPremade from './DetailPremade';
import DetailPillow from "./DetailPillow";
import DetailTowel from "./DetailTowel";
import './Detail.css';

function Detail(props) {
    const { productId, category } = props;
    const fetchContext = useContext(FetchContext);
    const searchContext = useContext(SearchContext);

    const [products, setProducts] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true);

    function getDetail() {
        switch (category) {
            case 'premade':
                return <DetailPremade products={products} setProducts={setProducts}/>;
            case 'meter':
                return <DetailMeter products={products} />;
            case 'pillow':
                return <DetailPillow products={products} />;
            case 'towel':
                return <DetailTowel products={products} />;
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
    <ProductProvider productData={props} products={products} setProducts={setProducts}>
        <div className='product-detail'>
            <div className='back' onClick={()=>searchContext.setSearchResults(true)}>
                <MdOutlineArrowBackIos/> Wróć do wyników wyszukiwania
            </div>
            <DetailHeader products = {products} setProducts={setProducts}/>
            {getDetail()}
        </div>
    </ProductProvider>
    );
}

export default Detail;