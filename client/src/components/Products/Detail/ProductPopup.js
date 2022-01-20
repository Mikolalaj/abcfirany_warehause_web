import Popup from '../../Common/Popup/Popup';
import PremadeForm from './PremadeForm';
import './ProductPopup.css';

function ProductPopup({ trigger, closePopup, onYes, okButtonText, labelText, productData, symbol }) {

    return (
        <Popup trigger={trigger} closePopup={closePopup}>
            <div className='product-popup'>
                <h2>{labelText}</h2>
                <h1>{symbol}</h1>
                <PremadeForm closePopup={closePopup} okButtonText={okButtonText} onYes={onYes} productData={productData}/>
            </div>
        </Popup>
    )
}

ProductPopup.defaultProps = {
    productData: {
        shelving: '',
        column: '',
        shelf: ''
    }
}

export default ProductPopup;