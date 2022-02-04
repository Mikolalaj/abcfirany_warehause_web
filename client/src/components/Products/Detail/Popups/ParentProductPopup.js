import Popup from '../../../Common/Popup/Popup';
import ParentProductForm from '../Forms/ParentProductForm';
import './ProductPopup.css';

function ParentProductPopup({ trigger, closePopup, onYes, productData, errorMessage }) {

    return (
        <Popup trigger={trigger} closePopup={closePopup}>
            <div className='product-popup'>
                <h2>Edytowanie produktu</h2>
                <h3 className={`form-error ${errorMessage !== '' && 'visible'}`}>{errorMessage}</h3>
                <ParentProductForm closePopup={closePopup} onYes={onYes} productData={productData} />
            </div>
        </Popup>
    )
}

export default ParentProductPopup;