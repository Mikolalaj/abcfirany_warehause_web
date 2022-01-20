import './Navbar.css';
import { Link, useHistory } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ImStatsBars, ImSearch } from "react-icons/im";
import { FaPlusCircle, FaUserAlt } from 'react-icons/fa';
import { IoSettingsSharp, IoLogOut } from 'react-icons/io5';
import { RiScissors2Fill } from "react-icons/ri";
import { HiHome } from 'react-icons/hi';

function Navbar() {
    const menuItems = [
        {
            name: 'Strona główna',
            link: '/',
            icon: <HiHome />
        },
        {
            name: 'Wyszukiwanie produktów',
            link: '/search',
            icon: <ImSearch />
        },
        {
            name: 'Dodaj produkt',
            link: '/add',
            icon: <FaPlusCircle />
        },
        {
            name: 'Dodaj metry',
            link: '',
            icon: <RiScissors2Fill />
        },
        {
            name: 'Ustawienia',
            link: '/settings',
            icon: <IoSettingsSharp />
        },
        {
            name: 'Statystyki',
            link: '/stats',
            icon: <ImStatsBars />
        },
        {
            name: 'Twoje konto',
            link: '/account',
            icon: <FaUserAlt />
        }
    ];

    useEffect(() => {
        for (let index = 0; index < menuItems.length; index++) {
            if (menuItems[index].link === window.location.pathname) {
                setSelectedItem(index);
                break;
            }
        }
    }, []);

    const [selectedItem, setSelectedItem] = useState(null);
    const history = useHistory();
    const authContext = useContext(AuthContext);

    function onLogoutButtonClick() {
        authContext.logout();
        history.push('/login');
    }

    return (
        <nav className="sidebar">
            {menuItems.map((item, index) =>
                <Link key={index} className={`menu-item ${index===selectedItem && 'selected'}`} to={item.link} onClick={()=>setSelectedItem(index)}>
                    <div className={`select ${index!==selectedItem && 'not-visible'}`}></div>
                    {item.icon}
                    <p className='item-tooltip'>
                        {item.name}
                    </p>
                </Link>
            )}
            <div className='menu-item' onClick={onLogoutButtonClick}>
                <IoLogOut />
                <p className='item-tooltip'>
                    Wyloguj się
                </p>
            </div>
        </nav>
    )
}

export default Navbar;