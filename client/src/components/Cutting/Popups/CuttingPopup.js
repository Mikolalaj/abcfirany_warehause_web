import Popup from '../../Common/Popup/Popup';
import CuttingForm from '../Forms/CuttingForm';
import './CuttingPopup.css';

function CuttingPopup({ trigger, closePopup, onYes, okButtonText, labelText, cuttingData, errorMessage }) {
    return (
        <Popup trigger={trigger} closePopup={closePopup}>
            <div className='cutting-popup'>
                <h2>{labelText}</h2>
                <h3 className={`form-error ${errorMessage !== '' && 'visible'}`}>{errorMessage}</h3>
                <CuttingForm
                    closePopup={closePopup}
                    onYes={onYes}
                    okButtonText={okButtonText}
                    cuttingData={cuttingData}
                />
            </div>
        </Popup>
    )
}

export default CuttingPopup;