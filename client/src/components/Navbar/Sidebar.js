import './Sidebar.css';
import { useHistory } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import AddCutting from '../Cutting/AddCutting';
import AddLack from '../Lacks/AddLack';
import SidebarItemMultiple from './SidebarItemMultiple';

import { ImStatsBars, ImSearch } from 'react-icons/im';
import { FaPlusCircle, FaUserAlt } from 'react-icons/fa';
import { IoSettingsSharp, IoLogOut } from 'react-icons/io5';
import { RiScissors2Fill } from 'react-icons/ri';
import { HiHome } from 'react-icons/hi';
import { MdWarning } from 'react-icons/md';

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
            options: [
                {
                    name: 'Dodaj brak',
                    onClick: () => {setLacksPopup(true)}
                },
                {
                    name: 'Zobacz braki',
                    link: '/lacks'
                }
            ],
            icon: <MdWarning />
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
        },
        {
            name: 'Wyloguj się',
            onClick: onLogoutButtonClick,
            icon: <IoLogOut />
        }
    ];
    
    useEffect(() => {
        for (let index = 0; index < sidebarItems.length; index++) {
            if (sidebarItems[index].options) {
                for (let childIndex = 0; childIndex < sidebarItems[index].options.length; childIndex++) {
                    if (sidebarItems[index].options[childIndex].link === window.location.pathname) {
                        setSelectedItem(index);
                        break;
                    }
                }
            }
            else {
                if (sidebarItems[index].link === window.location.pathname) {
                    setSelectedItem(index);
                    break;
                }
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
        <AddLack trigger={lacksPopup} closePopup={() => setLacksPopup(false)} />
        <nav className='sidebar'>
            {sidebarItems.map((item, index) => {
                if (item.options) {
                    return <SidebarItemMultiple key={index} index={index} item={item} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
                }
                else if (item.link) {
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
                else {
                    return (
                        <div key={index} className='menu-item' onClick={()=>item.onClick()}>
                            {item.icon}
                            <p className='item-tooltip'>
                                {item.name}
                            </p>
                        </div>
                    )
                }
            })}
        </nav>
    </>
    )
}

export default Sidebar;