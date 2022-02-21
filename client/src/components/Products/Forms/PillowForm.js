
import { useContext } from 'react';
import { ProductContext } from '../../../context/ProductContext';
import { useForm } from 'react-hook-form';
import {
    FinishSizeInput,
    AmountPiecesInput,
    ShelfCodeInput,
    CommentsInput,
    FeatureInput
} from './Inputs';
import FormPopup from '../../Common/Popup/FormPopup';

function PillowForm({ closePopup, okButtonText, onYes, productData }) {
    const { product: { productId } } = useContext(ProductContext);
    const { handleSubmit, ...useFormRest } = useForm();

    function onSubmit(formData) {
        const { finish, size, shelfCode, ...rest } = formData;
        onYes({ finish: finish.value, size: size.value, shelfCode: shelfCode.toUpperCase(), ...rest });
    }

    return (
    <FormPopup closePopup={closePopup} okButtonText={okButtonText} onYes={handleSubmit(onSubmit)}>
        <PillowInputs productId={productId} productData={productData} useFormRest={useFormRest} autoFocus={true} />
    </FormPopup>
    )
}

function PillowInputs({ productId, productData, useFormRest, autoFocus }) {

    return (
    <div className='form-inputs'>
        <FinishSizeInput useForm={useFormRest} defaultValue={{finish: productData?.finish, size: productData?.size}} autoFocus={autoFocus}/>
        <AmountPiecesInput useForm={useFormRest} defaultValue={productData?.amount} />
        <ShelfCodeInput useForm={useFormRest} defaultValue={productData?.shelfCode} type='pillows' />
        <FeatureInput useForm={useFormRest} productId={productId} defaultValue={productData?.feature} options={productData?.featureOptions} />
        <CommentsInput useForm={useFormRest} defaultValue={productData?.comments} />
    </div>
    )
}

export default PillowForm;
export { PillowInputs };
