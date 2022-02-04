
import { useForm } from 'react-hook-form';
import {
    SymbolInput,
    CommentsInput,
    ImageInput,
    SaleInput
} from './Inputs';
import FormPopup from '../../../Common/Popup/FormPopup';

function ParentProductForm({ closePopup, onYes, productData }) {
    const {register, handleSubmit, getValues, formState: { errors }} = useForm();

    return (
    <FormPopup closePopup={closePopup} okButtonText='Edytuj' onYes={handleSubmit(onYes)}>
        <SymbolInput register={register} errors={errors} defaultValue={productData.symbol} autoFocus={true}/>
        <ImageInput register={register} getValues={getValues} errors={errors} defaultValue={productData.image} />
        <SaleInput register={register} defaultValue={productData.sale} />
        <CommentsInput register={register} errors={errors} defaultValue={productData.comments} />
    </FormPopup>
    )
}

export default ParentProductForm;
