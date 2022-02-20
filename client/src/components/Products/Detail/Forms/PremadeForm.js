
import { useContext } from 'react';
import { ProductContext } from '../../../../context/ProductContext';
import { useForm } from 'react-hook-form';
import {
    AmountPiecesInput,
    ShelfCodeInput,
    CommentsInput,
    FinishInput,
    SizeInput,
    FeatureInput
} from './Inputs';
import FormPopup from '../../../Common/Popup/FormPopup';

function PremadeForm({ closePopup, okButtonText, onYes, productData }) {
    const { product: { productId } } = useContext(ProductContext);
    const {handleSubmit, ...useFormRest} = useForm();

    return (
    <FormPopup closePopup={closePopup} okButtonText={okButtonText} onYes={handleSubmit(onYes)}>
        <SizeInput useForm={useFormRest} defaultValue={productData.size} autoFocus={true}/>
        <AmountPiecesInput useForm={useFormRest} defaultValue={productData.amount} />
        <ShelfCodeInput useForm={useFormRest} defaultValue={productData.shelfCode} />
        <FinishInput useForm={useFormRest} defaultValue={productData.finish} />
        <FeatureInput useForm={useFormRest} productId={productId} defaultValue={productData.feature} />
        <CommentsInput useForm={useFormRest} defaultValue={productData.comments} />
    </FormPopup>
    )
}

function PremadeFormPure({ productId }) {
    const {handleSubmit, ...useFormRest} = useForm();

    return (
    <>
        <SizeInput useForm={useFormRest} autoFocus={true}/>
        <AmountPiecesInput useForm={useFormRest} />
        <ShelfCodeInput useForm={useFormRest} />
        <FinishInput useForm={useFormRest} />
        <FeatureInput useForm={useFormRest} productId={productId} />
        <CommentsInput useForm={useFormRest} />
    </>
    )
}

export default PremadeForm;
export { PremadeFormPure };
