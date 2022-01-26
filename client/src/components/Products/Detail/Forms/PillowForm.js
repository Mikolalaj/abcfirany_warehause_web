
import { useForm } from 'react-hook-form';
import {
    AmountPiecesInput,
    ShelfCodeInput,
    CommentsInput,
    FinishInput,
    SizeInput
} from './Inputs';
import './ProductForm.css';

function PillowForm({ closePopup, okButtonText, onYes, productData }) {
    const {register, handleSubmit, formState: { errors }} = useForm();

    function onSubmit(formData) {
        let {shelfCode, ...rest} = formData;
        onYes({...rest, shelf: shelfCode.toUpperCase()});
    }

    return (
    <form className='product-form'>
        <SizeInput register={register} errors={errors} defaultValue={productData.size} />
        <AmountPiecesInput register={register} errors={errors} defaultValue={productData.amount} />
        <ShelfCodeInput register={register} errors={errors} defaultValue={productData.shelf} type='pillows' />
        <FinishInput register={register} errors={errors} defaultValue={productData.finish} />
        <CommentsInput register={register} errors={errors} defaultValue={productData.comments} />

        <div className="popup-buttons">
            <div className="popup-no" onClick={closePopup}>
                Anuluj
            </div>
            <div className="popup-yes" onClick={handleSubmit(onSubmit)}>
                {okButtonText}
            </div>
        </div>
    </form>
    )
}

export default PillowForm;
