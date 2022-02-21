import './FormPopup.css';
import '../../Common/Forms/Forms.css';

function FormPopup({ children, closePopup, okButtonText, onYes }) {
    return (
    <form className='popup-form' autoComplete='off'>
        <div className='form-inputs'>
            {children}
        </div>
        <div className='popup-buttons'>
            <div className='popup-no' onClick={closePopup}>
                Anuluj
            </div>
            <div className='popup-yes' onClick={onYes}>
                {okButtonText}
            </div>
        </div>
    </form>
    )
}

export default FormPopup;
