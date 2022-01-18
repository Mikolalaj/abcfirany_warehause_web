import Popup from '../../Common/Popup/Popup';
import { useState } from 'react';
import './CutPopup.css';

function CutPopup({ trigger, closePopup, message, errorMessage, onYes, onNo }) {
    const [amount, setAmount] = useState('');

    function updateAmount(event) {
        setAmount(event.target.value);
    }

    return (
        <Popup trigger={trigger} closePopup={closePopup}>
            <div className='cut-popup' >
                <h1>{message}</h1>
                <p>{errorMessage}</p>
                <form onSubmit={()=>{onYes(amount)}}>
                    <input
                        type='text'
                        placeholder='szt.'
                        onChange={updateAmount}
                        amount={amount}
                    />
                </form>
                <div className="popup-buttons">
                    <div className="popup-no" onClick={onNo}>
                        Anuluj
                    </div>
                    <div className="popup-yes" onClick={()=>{onYes(amount)}}>
                        OK
                    </div>
                </div>
            </div>
        </Popup>
    )
}

export default CutPopup;