
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
    const {register, handleSubmit, control, setValue, resetField, formState: { errors }} = useForm();

    return (
    <FormPopup closePopup={closePopup} okButtonText={okButtonText} onYes={handleSubmit(onYes)}>
        <FinishSizeInput control={control} resetField={resetField} errors={errors} productData={productData} autoFocus={true}/>
        <AmountPiecesInput register={register} errors={errors} defaultValue={productData.amount} />
        <ShelfCodeInput register={register} errors={errors} defaultValue={productData.shelf} type='pillows' />
        <FeatureInput control={control} setValue={setValue} errors={errors} productId={productId} defaultValue={productData.feature} />
        <CommentsInput register={register} errors={errors} defaultValue={productData.comments} />
    </FormPopup>
    )
}

export default PillowForm;
