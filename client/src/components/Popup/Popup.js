import './Popup.css'
import { IoClose } from 'react-icons/io5'

function Popup({ children, trigger, closePopup }) {

    return (
        trigger ? (
        <div className='popup'>
            <div className="popup-inner">
                <div onClick={closePopup} className="close-popup"><IoClose /></div>
                <div className="popup-content">
                    {children}
                </div>
            </div>
        </div>
        ) : ''
    )
}

export default Popup;