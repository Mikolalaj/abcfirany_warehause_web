
import { useForm } from 'react-hook-form';
import {
    AmountPiecesInput,
    ShelfCodeInput,
    CommentsInput,
    FinishInput,
    SizeInput
} from './Inputs';
import FormPopup from '../../../Common/Popup/FormPopup';

function PremadeForm({ closePopup, okButtonText, onYes, productData }) {
    const {register, handleSubmit, formState: { errors }} = useForm();

    function onSubmit(formData) {
        let {shelfCode, ...rest} = formData;
        shelfCode = shelfCode.split('-');
        onYes({...rest, shelving: shelfCode[0], column: shelfCode[1], shelf: shelfCode[2]});
    }

    return (
    <FormPopup closePopup={closePopup} okButtonText={okButtonText} onYes={handleSubmit(onSubmit)}>
        <SizeInput register={register} errors={errors} defaultValue={productData.size} />
        <AmountPiecesInput register={register} errors={errors} defaultValue={productData.amount} />
        <ShelfCodeInput register={register} errors={errors} defaultValue={productData.shelving === '' ? '' : `${productData.shelving}-${productData.column}-${productData.shelf}`} />
        <FinishInput register={register} errors={errors} defaultValue={productData.finish} />
        <CommentsInput register={register} errors={errors} defaultValue={productData.comments} />
    </FormPopup>
    )
}

export default PremadeForm;
