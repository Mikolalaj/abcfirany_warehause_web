import Popup from "./Popup";
import './YesNoPopup.css';

function YesNoPopup({ message, onYes, onNo }) {
    return (
        <Popup trigger={false}>
            <div className='yes-no-popup' >
                <h1>{message}</h1>
                <div className="popup-buttons">
                    <div className="popup-no" onClick={onNo}>
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