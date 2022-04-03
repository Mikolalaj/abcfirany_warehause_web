
import { useForm, } from 'react-hook-form';
import {
    AmountInput,
    CommentsInput,
    OrderNumberInput,
    SymbolFeatureInput,
    SizeInput
} from './Inputs';
import FormPopup from '../../Common/Popup/FormPopup';

function LacksForm({ closePopup, okButtonText, onYes, lacksData }) {
    const {handleSubmit, ...useFormRest} = useForm();

    function onSubmit(formData) {
        if (formData.feature) {
            formData.featureId = formData.feature.value;
        }
        else {
            formData.featureId = null;
        }
        delete formData.feature;

        formData.productId = formData.symbol.value;
        delete formData.symbol

        formData.unit = formData.unit.value;

        onYes(formData)
    }

    return (
    <FormPopup closePopup={closePopup} okButtonText={okButtonText} onYes={handleSubmit(onSubmit)}>
        <SymbolFeatureInput useForm={useFormRest} defaultValue={lacksData} autoFocus={true} />
        <SizeInput useForm={useFormRest} defaultValue={lacksData.size} />
        <AmountInput useForm={useFormRest} defaultValue={lacksData} />
        <OrderNumberInput useForm={useFormRest} defaultValue={lacksData.orderNumber}/>
        <CommentsInput useForm={useFormRest} defaultValue={lacksData.comments} />
    </FormPopup>
    )
}

export default LacksForm;
