import { useState, useEffect, useContext } from "react";
import { FetchContext } from "../../../context/FetchContext"
import { ProductContext } from "../../../context/ProductContext";
import { MdOutlineArrowBackIos } from "react-icons/md"
import Loading from "../../Common/Loading";
import DetailHeader from "./DetailHeader";
import DetailMeter from './DetailMeter';
import DetailPremade from './DetailPremade';
import DetailPillow from "./DetailPillow";
import DetailTowel from "./DetailTowel";
import './Detail.css';

function Detail() {
    const fetchContext = useContext(FetchContext);
    const { productId, category, setSearchPage, setChildProducts } = useContext(ProductContext);

    const [isLoading, setIsLoading] = useState(true);

    function getDetail() {
        switch (category) {
            case 'premade':
                return <DetailPremade />;
            case 'meter':
                return <DetailMeter />;
            case 'pillow':
                return <DetailPillow />;
            case 'towel':
                return <DetailTowel />;
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
        <div className='back' onClick={()=>setSearchPage(true)}>
            <MdOutlineArrowBackIos/> Wróć do wyników wyszukiwania
        </div>
        <DetailHeader/>
        {getDetail()}
    </div>
    );
}

export default Detail;