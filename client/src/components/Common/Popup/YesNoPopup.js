import Popup from "./Popup";
import './YesNoPopup.css';

function YesNoPopup({ trigger, closePopup, message, errorMessage, onYes }) {
    return (
        <Popup trigger={trigger} closePopup={closePopup}>
            <div className='yes-no-popup' >
                <h1>{message}</h1>
                <p>{errorMessage}</p>
                <div className="popup-buttons">
                    <div className="popup-no" onClick={closePopup}>
                        Nie
                    </div>
                    <div className="popup-yes" onClick={onYes}>
                        Tak
                    </div>
                </div>
            </div>
        </Popup>
    )
}

export default YesNoPopup;