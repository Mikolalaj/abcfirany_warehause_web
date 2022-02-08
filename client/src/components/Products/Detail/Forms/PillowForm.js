
import { useForm } from 'react-hook-form';
import {
    FinishSizeInput,
    AmountPiecesInput,
    ShelfCodeInput,
    CommentsInput
} from './Inputs';
import FormPopup from '../../../Common/Popup/FormPopup';

function PillowForm({ closePopup, okButtonText, onYes, productData }) {
    const {register, handleSubmit, control, resetField, formState: { errors }} = useForm();

    function onSubmit(formData) {
        let {shelfCode, finish, size, ...rest} = formData;
        onYes({...rest, shelf: shelfCode.toUpperCase(), finish: finish.value, size: size.value});
    }

    return (
    <FormPopup closePopup={closePopup} okButtonText={okButtonText} onYes={handleSubmit(onSubmit)}>
        <FinishSizeInput control={control} resetField={resetField} errors={errors} productData={productData} autoFocus={true}/>
        <AmountPiecesInput register={register} errors={errors} defaultValue={productData.amount} />
        <ShelfCodeInput register={register} errors={errors} defaultValue={productData.shelf} type='pillows' />
        <CommentsInput register={register} errors={errors} defaultValue={productData.comments} />
    </FormPopup>
    )
}

export default PillowForm;
