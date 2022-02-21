
import { useContext } from 'react';
import { ProductContext } from '../../../context/ProductContext';
import { useForm } from 'react-hook-form';
import {
    AmountPiecesInput,
    ShelfCodeInput,
    CommentsInput,
    FinishInput,
    SizeInput,
    FeatureInput
} from './Inputs';
import FormPopup from '../../Common/Popup/FormPopup';

function PremadeForm({ closePopup, okButtonText, onYes, productData }) {
    const { product: { productId } } = useContext(ProductContext);
    const {handleSubmit, ...useFormRest} = useForm();

    return (
    <FormPopup closePopup={closePopup} okButtonText={okButtonText} onYes={handleSubmit(onYes)}>
        <PremadeInputs productId={productId} productData={productData} useFormRest={useFormRest} autoFocus={true}/>
    </FormPopup>
    )
}

function PremadeInputs({ productId, productData, useFormRest, autoFocus }) {

    return (
    <div className='form-inputs'>
        <SizeInput useForm={useFormRest} defaultValue={productData?.size} autoFocus={autoFocus}/>
        <AmountPiecesInput useForm={useFormRest} defaultValue={productData?.amount} />
        <ShelfCodeInput useForm={useFormRest} defaultValue={productData?.shelfCode} />
        <FinishInput useForm={useFormRest} defaultValue={productData?.finish} />
        <FeatureInput useForm={useFormRest} productId={productId} defaultValue={productData?.feature} options={productData?.featureOptions} />
        <CommentsInput useForm={useFormRest} defaultValue={productData?.comments} />
    </div>
    )
}

export default PremadeForm;
export { PremadeInputs };
