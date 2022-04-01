
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
    const {register, handleSubmit, control, getValues, resetField, formState: { errors }} = useForm();

    function onSubmit(formData) {
        formData.featureId = formData.feature.value;
        formData.productId = formData.symbol.value;
        delete formData.feature
        delete formData.symbol
        onYes(formData);
    }

    return (
    <FormPopup closePopup={closePopup} okButtonText={okButtonText} onYes={handleSubmit(onSubmit)}>
        <SymbolFeatureInput register={register} errors={errors} defaultValue={lacksData.symbol} getValues={getValues} resetField={resetField} control={control} autoFocus={true} />
        <SizeInput register={register} errors={errors} defaultValue={lacksData.size} />
        <AmountInput register={register} errors={errors} defaultValue={lacksData.amount} />
        <OrderNumberInput register={register} errors={errors} defaultValue={lacksData.orderNumber}/>
        <CommentsInput register={register} errors={errors} defaultValue={lacksData.comments} />
    </FormPopup>
    )
}

export default LacksForm;
