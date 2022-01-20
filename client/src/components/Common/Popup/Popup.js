import './Popup.css'
import { useState } from 'react';

function Popup({ children, trigger, closePopup }) {

    const [startClick, setStartClick] = useState(null);

    function handleClickOutside(event) {
        event.preventDefault();
        if(startClick === event.currentTarget) {
            closePopup();
        }
        setStartClick(null);
    }
    
    return (
        trigger ? (
        <div className='popup' onClick={handleClickOutside} onMouseDown={event => setStartClick(event.target)}>
            <div className="popup-inner">
                <div className="popup-content">
                    {children}
                </div>
            </div>
        </div>
        ) : ''
    )
}

export default Popup;