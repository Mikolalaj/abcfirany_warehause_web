import Popup from '../../../Common/Popup/Popup';
import PremadeForm from '../Forms/PremadeForm';
import { useContext } from 'react';
import { ProductContext } from '../../../../context/ProductContext';
import './ProductPopup.css';

function ProductPopup({ trigger, closePopup, onYes, okButtonText, labelText, productData, errorMessage }) {
    const { product: { symbol } } = useContext(ProductContext);

    return (
        <Popup trigger={trigger} closePopup={closePopup}>
            <div className='product-popup'>
                <h2>{labelText}</h2>
                <h1>{symbol}</h1>
                <h3 className={`form-error ${errorMessage !== '' && 'visible'}`}>{errorMessage}</h3>
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