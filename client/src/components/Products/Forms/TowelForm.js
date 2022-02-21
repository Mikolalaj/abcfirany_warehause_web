
import { useContext } from 'react';
import { ProductContext } from '../../../context/ProductContext';
import { useForm } from 'react-hook-form';
import {
    AmountPiecesInput,
    ShelfCodeInput,
    CommentsInput,
    SizeInput,
    FeatureInput
} from './Inputs';
import FormPopup from '../../Common/Popup/FormPopup';

function TowelForm({ closePopup, okButtonText, onYes, productData }) {
    const { product: { productId } } = useContext(ProductContext);
    const {handleSubmit, ...useFormRest} = useForm();

    return (
    <FormPopup closePopup={closePopup} okButtonText={okButtonText} onYes={handleSubmit(onYes)}>
        <TowelInputs productId={productId} productData={productData} useForm={useFormRest} autoFocus={true}/>
    </FormPopup>
    )
}

function TowelInputs({ productId, productData, useFormRest, autoFocus }) {

    return (
    <div className='form-inputs'>
        <SizeInput useForm={useFormRest} defaultValue={productData?.size} autoFocus={autoFocus}/>
        <AmountPiecesInput useForm={useFormRest} defaultValue={productData?.amount} />
        <ShelfCodeInput useForm={useFormRest} defaultValue={productData?.shelfCode} />
        <FeatureInput useForm={useFormRest} productId={productId} defaultValue={productData?.feature} options={productData?.featureOptions} />
        <CommentsInput useForm={useFormRest} defaultValue={productData?.comments} />
    </div>
    )
}

export default TowelForm;
export { TowelInputs };
