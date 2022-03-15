import './Topbar.css';
import { Link, useHistory } from 'react-router-dom';
import SearchInput from '../Common/SearchInput';
import { GiCardboardBox } from 'react-icons/gi';

function Topbar() {
    let history = useHistory();

    return (
    <nav className='topbar'>
        <Link to='/dashboard'>
            <div className='icon-text'>
                <h1>Magazyn abcfirany</h1>
                <GiCardboardBox />
            </div>
        </Link>
        <div style={{'width': '450px'}}>
            <SearchInput onSearch={ searchText => history.push(`/search?symbol=${searchText}`) }>Szukaj produktu</SearchInput>
        </div>
    </nav>
    )
}

export default Topbar;