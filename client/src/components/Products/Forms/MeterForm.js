
import { useContext } from 'react';
import { ProductContext } from '../../../context/ProductContext';
import { useForm } from 'react-hook-form';
import {
    WidthInput,
    AmountMeterInput,
    ShelfCodeInput,
    CommentsInput,
    FeatureInput
} from './Inputs';
import FormPopup from '../../Common/Popup/FormPopup';
import '../../Common/Forms/Forms.css';

function MeterForm({ closePopup, okButtonText, onYes, productData }) {
    const { product: { productId } } = useContext(ProductContext);
    const {handleSubmit, ...useFormRest} = useForm();

    return (
    <FormPopup closePopup={closePopup} okButtonText={okButtonText} onYes={handleSubmit(onYes)}>
        <MeterInputs productId={productId} productData={productData} useFormRest={useFormRest} autoFocus={true}/>
    </FormPopup>
    )
}

function MeterInputs({ productId, productData, useFormRest, autoFocus }) {

    return (
    <div className='form-inputs'>
        <WidthInput useForm={useFormRest} defaultValue={productData?.width} autoFocus={autoFocus}/>
        <AmountMeterInput useForm={useFormRest} defaultValue={productData?.amount} />
        <ShelfCodeInput useForm={useFormRest} defaultValue={productData?.shelfCode} />
        <FeatureInput useForm={useFormRest} productId={productId} defaultValue={productData?.feature} options={productData?.featureOptions} />
        <CommentsInput useForm={useFormRest} defaultValue={productData?.comments} />
    </div>
    )
}

export default MeterForm;
export { MeterInputs };
