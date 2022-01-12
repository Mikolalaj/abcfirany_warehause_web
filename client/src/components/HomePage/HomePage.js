
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';
import { FetchContext } from '../../context/FetchContext';
import './homepage.css'

function Home() {
    const fetchContext = useContext(FetchContext);
    const history = useHistory();

    const [searchSymbol, setSearchSymbol] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const authContext = useContext(AuthContext);
    const { authState } = authContext;

    function onLogoutButtonClick() {
        authContext.logout();
        history.push('/login');
    }

    function updateSymbol(event) {
        setSearchSymbol(event.target.value);
    }

    async function searchProducts() {
        const { data } = await fetchContext.authAxios.get(`/products/${searchSymbol}`);
        setSearchResult(data);
    }

    return (
    <div>
        <h1>Cześć {authState.userInfo.firstName}</h1>
        {authContext.isAdmin() && <h2>Tylko admin może zobaczyć tą wiadomość</h2>}
        <div className='search'>
            <input type="text" placeholder='Symbol produktu' value={searchSymbol} onChange={updateSymbol}/>
            <button onClick={searchProducts}>Szukaj</button>
        </div>
        <button onClick={onLogoutButtonClick}>Wyloguj</button>
        {searchResult.map(product => {
            return (
            <div key={product.product_id}>
                <div>{product.symbol}</div>
                <img className="product-img" src={product.img} alt={product.symbol}/>
            </div>
            );
        })}
    </div>
    );
}

export default Home;
