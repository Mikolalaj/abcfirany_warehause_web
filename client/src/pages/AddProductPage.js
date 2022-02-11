import { useForm } from 'react-hook-form';
import {
    SymbolInput,
    CommentsInput,
    ImageInput,
    SaleInput
} from '../components/Products/Detail/Forms/Inputs';
import Button from '../components/Common/Button';
import './AddProductPage.css';

function AddProductPage() {
    const {register, handleSubmit, getValues, formState: { errors }} = useForm();
    
    function addProduct(formData) {
        console.log(formData)
    }

    return (
        <div className='add-product-page'>
            <h1>Dodaj nowy produkt</h1>
            <form onSubmit={handleSubmit(addProduct)}>
                <SymbolInput register={register} errors={errors} autoFocus={true}/>
                <ImageInput register={register} getValues={getValues} errors={errors}/>
                <SaleInput register={register} />
                <CommentsInput register={register} errors={errors} />
                <Button theme='primary'>Dodaj</Button>
                <Button theme='cancel'>Anuluj</Button>
            </form>
        </div>
    )
}

export default AddProductPage;