import './Popup.css'

function Popup({ children, trigger, closePopup }) {

    function handleClickOutside(event) {
        event.preventDefault();
        if(event.target === event.currentTarget) {
            closePopup();
        }
    }

    return (
        trigger ? (
        <div className='popup' onClick={handleClickOutside}>
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