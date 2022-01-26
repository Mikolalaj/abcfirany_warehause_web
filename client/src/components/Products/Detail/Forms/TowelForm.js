
import { useForm } from 'react-hook-form';
import {
    AmountPiecesInput,
    ShelfCodeInput,
    CommentsInput,
    SizeInput
} from './Inputs';
import './ProductForm.css';

function TowelForm({ closePopup, okButtonText, onYes, productData }) {
    const {register, handleSubmit, formState: { errors }} = useForm();

    function onSubmit(formData) {
        let {shelfCode, ...rest} = formData;
        shelfCode = shelfCode.split('-');
        onYes({...rest, shelving: shelfCode[0], column: shelfCode[1], shelf: shelfCode[2]});
    }

    return (
    <form className='product-form'>
        <SizeInput register={register} errors={errors} defaultValue={productData.size} />
        <AmountPiecesInput register={register} errors={errors} defaultValue={productData.amount} />
        <ShelfCodeInput register={register} errors={errors} defaultValue={productData.shelving === '' ? '' : `${productData.shelving}-${productData.column}-${productData.shelf}`} />
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

export default TowelForm;
