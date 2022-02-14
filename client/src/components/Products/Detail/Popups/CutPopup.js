import Popup from '../../../Common/Popup/Popup';
import { useState } from 'react';
import './CutPopup.css';

function CutPopup({ trigger, closePopup, message, errorMessage, onYes }) {
    const [amount, setAmount] = useState('');

    function updateAmount(event) {
        setAmount(event.target.value);
    }

    return (
        <Popup trigger={trigger} closePopup={()=>{closePopup(); setAmount('')}}>
            <div className='cut-popup' >
                <h1>{message}</h1>
                <p className='error'>{errorMessage}</p>
                <form onSubmit={(e)=>{e.preventDefault(); onYes(amount)}}>
                    <input
                        autoFocus
                        type='text'
                        onChange={updateAmount}
                        value={amount}
                    />
                    <p>szt.</p>
                </form>
                <div className='popup-buttons'>
                    <div className='popup-no' onClick={()=>{closePopup(); setAmount('')}}>
                        Anuluj
                    </div>
                    <div className='popup-yes' onClick={()=>{onYes(amount)}}>
                        OK
                    </div>
                </div>
            </div>
        </Popup>
    )
}

export default CutPopup;