
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
    const {register, handleSubmit, control, getValues, setValue, resetField, formState: { errors }} = useForm();

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
        <SymbolFeatureInput register={register} errors={errors} defaultValue={lacksData} getValues={getValues} setValue={setValue} resetField={resetField} control={control} autoFocus={true} />
        <SizeInput register={register} errors={errors} defaultValue={lacksData.size} />
        <AmountInput register={register} errors={errors} control={control} defaultValue={lacksData} />
        <OrderNumberInput register={register} errors={errors} defaultValue={lacksData.orderNumber}/>
        <CommentsInput register={register} errors={errors} defaultValue={lacksData.comments} />
    </FormPopup>
    )
}

export default LacksForm;
