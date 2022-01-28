
import { useForm } from 'react-hook-form';
import {
    AmountPiecesInput,
    ShelfCodeInput,
    CommentsInput,
    FinishInput,
    SizeInput
} from './Inputs';
import FormPopup from '../../../Common/Popup/FormPopup';

function PillowForm({ closePopup, okButtonText, onYes, productData }) {
    const {register, handleSubmit, formState: { errors }} = useForm();

    function onSubmit(formData) {
        let {shelfCode, ...rest} = formData;
        onYes({...rest, shelf: shelfCode.toUpperCase()});
    }

    return (
    <FormPopup closePopup={closePopup} okButtonText={okButtonText} onYes={handleSubmit(onSubmit)}>
        <SizeInput register={register} errors={errors} defaultValue={productData.size} autoFocus={true}/>
        <AmountPiecesInput register={register} errors={errors} defaultValue={productData.amount} />
        <ShelfCodeInput register={register} errors={errors} defaultValue={productData.shelf} type='pillows' />
        <FinishInput register={register} errors={errors} defaultValue={productData.finish} />
        <CommentsInput register={register} errors={errors} defaultValue={productData.comments} />
    </FormPopup>
    )
}

export default PillowForm;
