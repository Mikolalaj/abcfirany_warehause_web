
import { useForm } from 'react-hook-form';
import {
    AmountInput,
    CommentsInput,
    OrderNumberInput,
    SymbolInput,
    SizeInput,
    FeaturesInput
} from './Inputs';
import FormPopup from '../../Common/Popup/FormPopup';

function CuttingForm({ closePopup, okButtonText, onYes, lacksData }) {
    const {register, handleSubmit, control, formState: { errors }} = useForm();
    
    function onSubmit(formData) {
        if (formData.orderNumber === '') {
            delete formData.orderNumber
        }
        formData.destination = formData.destination.value;
        onYes(formData);
    }

    return (
    <FormPopup closePopup={closePopup} okButtonText={okButtonText} onYes={handleSubmit(onSubmit)}>
        <SymbolInput register={register} errors={errors} defaultValue={lacksData.symbol} control={control} autoFocus={true} />
        <SizeInput register={register} errors={errors} defaultValue={lacksData.size} />
        <FeaturesInput register={register} errors={errors} defaultValue={lacksData.features} />
        <AmountInput register={register} errors={errors} defaultValue={lacksData.amount} />
        <OrderNumberInput register={register} errors={errors} defaultValue={lacksData.orderNumber}/>
        <CommentsInput register={register} errors={errors} defaultValue={lacksData.comments} />
    </FormPopup>
    )
}

export default CuttingForm;
