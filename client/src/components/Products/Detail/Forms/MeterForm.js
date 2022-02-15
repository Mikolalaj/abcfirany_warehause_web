
import { useContext } from 'react';
import { ProductContext } from '../../../../context/ProductContext';
import { useForm } from 'react-hook-form';
import {
    WidthInput,
    AmountMeterInput,
    ShelfCodeInput,
    CommentsInput,
    FeatureInput
} from './Inputs';
import FormPopup from '../../../Common/Popup/FormPopup';

function MeterForm({ closePopup, okButtonText, onYes, productData }) {
    const { product: { productId } } = useContext(ProductContext);
    const {handleSubmit, ...useFormRest} = useForm();

    return (
    <FormPopup closePopup={closePopup} okButtonText={okButtonText} onYes={handleSubmit(onYes)}>
        <WidthInput useForm={useFormRest} defaultValue={productData.width} autoFocus={true}/>
        <AmountMeterInput useForm={useFormRest} defaultValue={productData.amount} />
        <ShelfCodeInput useForm={useFormRest} defaultValue={productData.shelfCode} />
        <FeatureInput useForm={useFormRest} productId={productId} defaultValue={productData.feature} />
        <CommentsInput useForm={useFormRest} defaultValue={productData.comments} />
    </FormPopup>
    )
}

export default MeterForm;
