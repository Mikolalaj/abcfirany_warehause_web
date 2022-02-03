import './Navbar.css';
import { Link, useHistory } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import AddCutting from '../Cutting/AddCutting';
import AddLacks from '../Lacks/AddLacks';

import { ImStatsBars, ImSearch } from 'react-icons/im';
import { FaPlusCircle, FaUserAlt, FaDog } from 'react-icons/fa';
import { IoSettingsSharp, IoLogOut } from 'react-icons/io5';
import { RiScissors2Fill } from 'react-icons/ri';
import { HiHome } from 'react-icons/hi';

function Navbar() {
    const menuItems = [
        {
            name: 'Strona główna',
            link: '/dashboard',
            icon: <HiHome />
        },
        {
            name: 'Wyszukiwanie produktów',
            link: '/search',
            icon: <ImSearch />
        },
        {
            name: 'Dodaj metry',
            onClick: () => {setCuttingPopup(true)},
            icon: <RiScissors2Fill />
        },
        {
            name: 'Dodaj brak',
            onClick: () => {setLacksPopup(true)},
            icon: <FaDog />
        },
        {
            name: 'Dodaj produkt',
            link: '/add-product',
            icon: <FaPlusCircle />
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

    const [cuttingPopup, setCuttingPopup] = useState(false);
    const [lacksPopup, setLacksPopup] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const history = useHistory();
    const authContext = useContext(AuthContext);

    function onLogoutButtonClick() {
        authContext.logout();
        history.push('/login');
    }

    

    return (
    <>
        <AddCutting trigger={cuttingPopup} closePopup={() => setCuttingPopup(false)} />
        <AddLacks trigger={lacksPopup} closePopup={() => setLacksPopup(false)} />
        <nav className='sidebar'>
            {menuItems.map((item, index) => {
                if (item.link === undefined) {
                    return (
                        <div key={index} className='menu-item' onClick={()=>item.onClick()}>
                            {item.icon}
                            <p className='item-tooltip'>
                                {item.name}
                            </p>
                        </div>
                    )
                } else {
                    return (
                        <Link
                            key={index}
                            className={`menu-item ${index===selectedItem && 'selected'}`}
                            to={item.link}
                            onClick={()=>setSelectedItem(index)}
                        >
                            <div className={`select ${index!==selectedItem && 'not-visible'}`}></div>
                            {item.icon}
                            <p className='item-tooltip'>
                                {item.name}
                            </p>
                        </Link>
                    )
                }
            })}
            <div className='menu-item' onClick={onLogoutButtonClick}>
                <IoLogOut />
                <p className='item-tooltip'>
                    Wyloguj się
                </p>
            </div>
        </nav>
    </>
    )
}

export default Navbar;