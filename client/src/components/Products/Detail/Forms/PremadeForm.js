
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
    const {register, handleSubmit, control, setValue, formState: { errors }} = useForm();

    return (
    <FormPopup closePopup={closePopup} okButtonText={okButtonText} onYes={handleSubmit(onYes)}>
        <SizeInput register={register} errors={errors} defaultValue={productData.size} autoFocus={true}/>
        <AmountPiecesInput register={register} errors={errors} defaultValue={productData.amount} />
        <ShelfCodeInput register={register} errors={errors} defaultValue={productData.shelfCode} />
        <FinishInput register={register} errors={errors} defaultValue={productData.finish} />
        <FeatureInput control={control} setValue={setValue} errors={errors} productId={productId} defaultValue={productData.feature} />
        <CommentsInput register={register} errors={errors} defaultValue={productData.comments} />
    </FormPopup>
    )
}

export default PremadeForm;
