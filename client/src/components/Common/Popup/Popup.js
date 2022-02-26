import './Popup.css'
import { useState } from 'react';

function Popup({ children, trigger, closePopup }) {

    const [startClick, setStartClick] = useState(null);

    function handleClickOutside(event) {
        if(startClick === event.currentTarget) {
            closePopup();
        }
        setStartClick(null);
    }

    function handleOnKeyDown(event) {
        if (event.key === 'Escape'){
            closePopup();
        }
    }
    
    return (
        trigger ? (
        <div tabIndex={0} className='popup' onKeyDown={handleOnKeyDown} onClick={handleClickOutside} onMouseDown={event => setStartClick(event.target)}>
            <div className='popup-inner'>
                <div className='popup-content'>
                    {children}
                </div>
            </div>
        </div>
        ) : ''
    )
}

export default Popup;