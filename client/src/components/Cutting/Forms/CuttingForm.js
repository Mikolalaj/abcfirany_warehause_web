
import { useForm } from 'react-hook-form';
import {
    AmountInput,
    CommentsInput,
    OrderNumberInput,
    DestinationInput
} from './Inputs';
import FormPopup from '../../Common/Popup/FormPopup';

function CuttingForm({ closePopup, okButtonText, onYes, cuttingData }) {
    const {register, handleSubmit, formState: { errors }, control} = useForm();
    
    function onSubmit(formData) {
        console.log(formData)
        // tutaj coś z danymi z formsa można zrobić
        onYes(formData);
    }

    return (
    <FormPopup closePopup={closePopup} okButtonText={okButtonText} onYes={handleSubmit(onSubmit)}>
        <AmountInput register={register} errors={errors} defaultValue={cuttingData.cuttingAmount} registerName='cuttingAmount' placeholder='Docięte metry' />
        <AmountInput register={register} errors={errors} defaultValue={cuttingData.sewingAmount} registerName='sewingAmount' placeholder='Metry do szycia' />
        <OrderNumberInput register={register} errors={errors} defaultValue={cuttingData.orderNumber} />
        <DestinationInput errors={errors} control={control} defaultValue={cuttingData.destination} />
        <CommentsInput register={register} errors={errors} defaultValue={cuttingData.comments} />
    </FormPopup>
    )
}

export default CuttingForm;
