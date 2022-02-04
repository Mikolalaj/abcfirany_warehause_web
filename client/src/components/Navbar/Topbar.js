import './Topbar.css';
import { Link } from 'react-router-dom';
import SearchProducts from '../Search/SearchProducts';
import { GiCardboardBox } from 'react-icons/gi';

function Topbar() {

    return (
    <nav className='topbar'>
        <Link to='/dashboard'>
            <div className='icon-text'>
                <h1>Magazyn abcfirany</h1>
                <GiCardboardBox />
            </div>
        </Link>
        <SearchProducts />
    </nav>
    )
}

export default Topbar;