
import { useContext } from 'react';
import { ProductContext } from '../../../../context/ProductContext';
import { useForm } from 'react-hook-form';
import {
    FinishSizeInput,
    AmountPiecesInput,
    ShelfCodeInput,
    CommentsInput,
    FeatureInput
} from './Inputs';
import FormPopup from '../../../Common/Popup/FormPopup';

function PillowForm({ closePopup, okButtonText, onYes, productData }) {
    const { product: { productId } } = useContext(ProductContext);
    const { handleSubmit, ...useFormRest } = useForm();

    function onSubmit(formData) {
        const { finish, size, shelfCode, ...rest } = formData;
        onYes({ finish: finish.value, size: size.value, shelfCode: shelfCode.toUpperCase(), ...rest });
    }

    return (
    <FormPopup closePopup={closePopup} okButtonText={okButtonText} onYes={handleSubmit(onSubmit)}>
        <FinishSizeInput useForm={useFormRest} defaultValue={{finish: productData.finish, size: productData.size}} autoFocus={true}/>
        <AmountPiecesInput useForm={useFormRest} defaultValue={productData.amount} />
        <ShelfCodeInput useForm={useFormRest} defaultValue={productData.shelfCode} type='pillows' />
        <FeatureInput useForm={useFormRest} productId={productId} defaultValue={productData.feature} />
        <CommentsInput useForm={useFormRest} defaultValue={productData.comments} />
    </FormPopup>
    )
}

export default PillowForm;
