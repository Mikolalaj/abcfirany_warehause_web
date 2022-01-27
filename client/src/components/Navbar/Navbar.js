import './Navbar.css';
import { Link, useHistory } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

import CuttingPopup from '../Cutting/Popups/CuttingPopup';

import { ImStatsBars, ImSearch } from "react-icons/im";
import { FaPlusCircle, FaUserAlt } from 'react-icons/fa';
import { IoSettingsSharp, IoLogOut } from 'react-icons/io5';
import { RiScissors2Fill } from "react-icons/ri";
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
            name: 'Dodaj produkt',
            onClick: () => {setCuttingPopup(true)},
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

    const [cuttingPopup, setCuttingPopup] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const history = useHistory();
    const authContext = useContext(AuthContext);

    function onLogoutButtonClick() {
        authContext.logout();
        history.push('/login');
    }

    return (
    <>
        <CuttingPopup 
            trigger={cuttingPopup}
            closePopup={() => setCuttingPopup(false)}
            onYes={() => setCuttingPopup(false)}
            okButtonText='Dodaj'
            labelText='Dodaj metry'
            errorMessage=''
            cuttingData={{}}
        />
        
        <nav className="sidebar">
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