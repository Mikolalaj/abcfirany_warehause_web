
import { useForm } from 'react-hook-form';
import {
    WidthInput,
    AmountMeterInput,
    ShelfCodeInput,
    CommentsInput } from './Inputs';
import FormPopup from '../../../Common/Popup/FormPopup';

function MeterForm({ closePopup, okButtonText, onYes, productData }) {
    const {register, handleSubmit, formState: { errors }} = useForm();
    
    function onSubmit(formData) {
        let {shelfCode, ...rest} = formData;
        shelfCode = shelfCode.split('-');
        onYes({...rest, shelving: shelfCode[0], column: shelfCode[1], shelf: shelfCode[2]});
    }

    return (
    <FormPopup closePopup={closePopup} okButtonText={okButtonText} onYes={handleSubmit(onSubmit)}>
        <WidthInput register={register} errors={errors} defaultValue={productData.width} />
        <AmountMeterInput register={register} errors={errors} defaultValue={productData.amount} />
        <ShelfCodeInput register={register} errors={errors} defaultValue={productData.shelving === '' ? '' : `${productData.shelving}-${productData.column}-${productData.shelf}`} />
        <CommentsInput register={register} errors={errors} defaultValue={productData.comments} />
    </FormPopup>
    )
}

export default MeterForm;
