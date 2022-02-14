
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
    const {register, handleSubmit, control, setValue, formState: { errors }} = useForm();

    return (
    <FormPopup closePopup={closePopup} okButtonText={okButtonText} onYes={handleSubmit(onYes)}>
        <WidthInput register={register} errors={errors} defaultValue={productData.width} autoFocus={true}/>
        <AmountMeterInput register={register} errors={errors} defaultValue={productData.amount} />
        <ShelfCodeInput register={register} errors={errors} defaultValue={productData.shelfCode} />
        <FeatureInput control={control} setValue={setValue} errors={errors} productId={productId} defaultValue={productData.feature} />
        <CommentsInput register={register} errors={errors} defaultValue={productData.comments} />
    </FormPopup>
    )
}

export default MeterForm;
