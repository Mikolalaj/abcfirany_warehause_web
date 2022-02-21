
import { useForm } from 'react-hook-form';
import NewProductForm from '../components/Products/AddProduct/NewProductForm'
import './AddProductPage.css';

function AddProductPage() {
    const { handleSubmit, ...useFormRest } = useForm();    
    function addProduct(formData) {
        let { category, ...formDataRest } = formData;
        formData = { ...formDataRest, category: category.value };
        console.log(formData)
    }

    return (
        <div className='add-product-page'>
            <h1>Dodawanie nowego produktu</h1>
            <form onSubmit={handleSubmit(addProduct)} noValidate>
                <NewProductForm useFormRest={useFormRest} />
                <button type='submit'>Dodaj</button>
            </form>
        </div>
    )
}

export default AddProductPage;