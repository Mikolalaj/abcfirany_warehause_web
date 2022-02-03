import Popup from '../../Common/Popup/Popup';
import LacksForm from '../Forms/LacksForm';

function LacksPopup({ trigger, closePopup, onYes, okButtonText, labelText, lacksData, errorMessage }) {
    return (
        <Popup trigger={trigger} closePopup={closePopup}>
            <div className='form-popup-wrapper'>
                <h2>{labelText}</h2>
                <h3 className={`form-error ${errorMessage !== '' && 'visible'}`}>{errorMessage}</h3>
                <LacksForm
                    closePopup={closePopup}
                    onYes={onYes}
                    okButtonText={okButtonText}
                    lacksData={lacksData}
                />
            </div>
        </Popup>
    )
}

LacksPopup.defaultProps = {
    lacksData: {
        symbol: '',
        size: '',
        features: '',
        amount: '',
        orderNumber: '',
        comments: ''
    }
}

export default LacksPopup;