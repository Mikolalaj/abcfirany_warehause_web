
import { useForm } from 'react-hook-form';
import {
    AmountInput,
    CommentsInput,
    OrderNumberInput,
    DestinationInput
} from './Inputs';
import FormPopup from '../../Common/Popup/FormPopup';

function CuttingForm({ closePopup, okButtonText, onYes, cuttingData }) {
    const {register, handleSubmit, formState: { errors }, control, setValue} = useForm();
    
    function onSubmit(formData) {
        if (formData.orderNumber === '') {
            delete formData.orderNumber
        }
        formData.destination = formData.destination.value;
        console.log(formData)
        // onYes(formData);
    }

    return (
    <FormPopup closePopup={closePopup} okButtonText={okButtonText} onYes={handleSubmit(onSubmit)}>
        <AmountInput register={register} errors={errors} defaultValue={cuttingData.cuttingAmount} registerName='cuttingAmount' placeholder='Docięte metry' autoFocus={true} />
        <AmountInput register={register} errors={errors} defaultValue={cuttingData.sewingAmount} registerName='sewingAmount' placeholder='Metry do szycia' />
        <OrderNumberInput register={register} errors={errors} defaultValue={cuttingData.orderNumber} setValue={setValue}/>
        <DestinationInput errors={errors} control={control} defaultValue={cuttingData.destination} />
        <CommentsInput register={register} errors={errors} defaultValue={cuttingData.comments} />
    </FormPopup>
    )
}

export default CuttingForm;
