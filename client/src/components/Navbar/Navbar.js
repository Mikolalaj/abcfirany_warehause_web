import './Navbar.css';
import { Link, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ImStatsBars, ImSearch } from "react-icons/im";
import { FaPlusCircle } from 'react-icons/fa';
import { IoSettingsSharp, IoLogOut } from 'react-icons/io5';
import { HiHome } from 'react-icons/hi';

function Navbar() {

    const menuItems = [
        {
            name: 'Home',
            link: '/',
            icon: <HiHome />
        },
        {
            name: 'Stats',
            link: '/stats',
            icon: <ImStatsBars />
        },
        {
            name: 'Search',
            link: '/search',
            icon: <ImSearch />
        },
        {
            name: 'Add',
            link: '/add',
            icon: <FaPlusCircle />
        },
        {
            name: 'Settings',
            link: '/settings',
            icon: <IoSettingsSharp />
        }
    ];

    const history = useHistory();
    const authContext = useContext(AuthContext);

    function onLogoutButtonClick() {
        authContext.logout();
        history.push('/login');
    }

    return (
        <nav className="sidebar">
            {menuItems.map(item =>
                <Link className='menu-item' to={item.link}>
                    {item.icon}
                    <p className='item-tooltip'>
                        {item.name}
                    </p>
                </Link>
            )}
            <div className='menu-item' onClick={onLogoutButtonClick}>
                <IoLogOut />
                <p className='item-tooltip'>
                    Log Out
                </p>
            </div>
        </nav>
    )
}

export default Navbar;