
import { useForm } from 'react-hook-form';
import {
    AmountInput,
    CommentsInput,
    OrderNumberInput,
    DestinationInput
} from './Inputs';
import FormPopup from '../../Common/Popup/FormPopup';

function CuttingForm({ closePopup, okButtonText, onYes, cuttingData }) {
    const {handleSubmit, ...restUseForm} = useForm();
    
    function onSubmit(formData) {
        if (formData.orderNumber === '') {
            delete formData.orderNumber
        }
        formData.destination = formData.destination.value;
        onYes(formData);
    }

    return (
    <FormPopup closePopup={closePopup} okButtonText={okButtonText} onYes={handleSubmit(onSubmit)}>
        <AmountInput useForm={restUseForm} defaultValue={cuttingData.cuttingAmount} registerName='cuttingAmount' placeholder='Docięte metry' autoFocus={true} />
        <AmountInput useForm={restUseForm} defaultValue={cuttingData.sewingAmount} registerName='sewingAmount' placeholder='Metry do szycia' />
        <OrderNumberInput useForm={restUseForm} defaultValue={cuttingData.orderNumber} />
        <DestinationInput useForm={restUseForm} defaultValue={cuttingData.destination} />
        <CommentsInput useForm={restUseForm} defaultValue={cuttingData.comments} />
    </FormPopup>
    )
}

export default CuttingForm;
