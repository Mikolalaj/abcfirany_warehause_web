
import { useForm } from 'react-hook-form';
import {
    SymbolInput,
    CommentsInput,
    ImageInput,
    SaleInput,
    FeaturesInput
} from './Inputs';
import FormPopup from '../../Common/Popup/FormPopup';

function ParentProductForm({ closePopup, onYes, productData }) {
    const {handleSubmit, ...useFormRest} = useForm();

    return (
    <FormPopup closePopup={closePopup} okButtonText='Edytuj' onYes={handleSubmit(onYes)}>
        <SymbolInput useForm={useFormRest} defaultValue={productData.symbol} autoFocus={true}/>
        <ImageInput useForm={useFormRest} defaultValue={productData.image} />
        <SaleInput useForm={useFormRest} defaultValue={productData.sale} />
        <FeaturesInput useForm={useFormRest} defaultValue={productData.features} />
        <CommentsInput useForm={useFormRest} defaultValue={productData.comments} />
    </FormPopup>
    )
}

export default ParentProductForm;
