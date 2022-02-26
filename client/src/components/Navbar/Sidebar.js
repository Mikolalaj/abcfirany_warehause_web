import './Sidebar.css';
import { useHistory } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import AddCutting from '../Cutting/AddCutting';
import AddLacks from '../Lacks/AddLacks';
import { ImStatsBars, ImSearch } from 'react-icons/im';
import { FaPlusCircle, FaUserAlt, FaDog } from 'react-icons/fa';
import { IoSettingsSharp, IoLogOut } from 'react-icons/io5';
import { RiScissors2Fill } from 'react-icons/ri';
import { HiHome } from 'react-icons/hi';

function Sidebar() {

    const sidebarItems = [
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
            options: [
                {
                    name: 'Dodaj metry',
                    onClick: () => {setCuttingPopup(true)}
                },
                {
                    name: 'Zobacz metry',
                    link: '/cutting'
                }
            ],
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
        for (let index = 0; index < sidebarItems.length; index++) {
            if (sidebarItems[index].link === window.location.pathname) {
                setSelectedItem(index);
                break;
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            {sidebarItems.map((item, index) => {
                if (item.options) {
                    return (
                        <div key={index} className={`menu-item ${index===selectedItem && 'selected'}`}>
                            <div className={`select ${index!==selectedItem && 'not-visible'}`}></div>
                            {item.icon}
                            <div className='options'>
                                {item.options.map((option, index) => {
                                    if (option.link === undefined) {
                                        return (
                                            <p key={index} className='item-tooltip-options' onClick={() => option.onClick()}>
                                                {option.name}
                                            </p>
                                        )
                                    }
                                    else {
                                        return (
                                            <p key={index} className='item-tooltip-options' onClick={() => {setSelectedItem(index); history.push(option.link)}}>
                                                {option.name}
                                            </p>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    )
                }
                else if (item.link === undefined) {
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
                        <div key={index} className={`menu-item ${index===selectedItem && 'selected'}`} onClick={() => {setSelectedItem(index); history.push(item.link)}} >
                            <div className={`select ${index!==selectedItem && 'not-visible'}`}></div>
                            {item.icon}
                            <p className='item-tooltip'>
                                {item.name}
                            </p>
                        </div>
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

export default Sidebar;