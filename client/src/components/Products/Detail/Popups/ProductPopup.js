import Popup from '../../../Common/Popup/Popup';
import PremadeForm from '../Forms/PremadeForm';
import MeterForm from '../Forms/MeterForm';
import PillowForm from '../Forms/PillowForm';
import TowelForm from '../Forms/TowelForm';
import { useContext } from 'react';
import { ProductContext } from '../../../../context/ProductContext';
import './ProductPopup.css';

function ProductPopup({ trigger, closePopup, onYes, okButtonText, labelText, productData, errorMessage }) {
    const { product: { symbol, category } } = useContext(ProductContext);

    const formProps = {
        closePopup,
        okButtonText,
        onYes,
        productData
    }

    return (
        <Popup trigger={trigger} closePopup={closePopup}>
            <div className='product-popup'>
                <h2>{labelText}</h2>
                <h1>{symbol}</h1>
                <h3 className={`form-error ${errorMessage !== '' && 'visible'}`}>{errorMessage}</h3>
                {category === 'premade' && <PremadeForm {...formProps} />}
                {category === 'meter' && <MeterForm {...formProps} />}
                {category === 'pillows' && <PillowForm {...formProps} />}
                {category === 'towels' && <TowelForm {...formProps} />}
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