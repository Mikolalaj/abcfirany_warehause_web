
import { useForm } from 'react-hook-form';
import NewProductForm from '../components/Products/AddProduct/NewProductForm'
import Button from '../components/Common/Button';
import './AddProductPage.css';

function AddProductPage() {
    const { handleSubmit, ...useFormRest } = useForm();    
    function addProduct(formData) {
        let { category, feature, symbol, finish, size, ...formDataRest } = formData;
        formData = {
            ...formDataRest,
            category: category.value,
            feature: feature?.value
        }

        if (symbol.value) {
            formData = {
                ...formData,
                productId: symbol.value
            }
        }
        else {
            formData = {
                ...formData,
                symbol
            }
        }

        if (finish) {
            formData = {
                ...formData,
                finish: finish.value
            }
        }

        if (size) {
            formData = {
                ...formData,
                size: size.value
            }
        }

        console.log(formData)
    }

    return (
        <div className='add-product-page'>
            <h1>Dodawanie nowego produktu</h1>
            <form onSubmit={handleSubmit(addProduct)} noValidate>
                <NewProductForm useFormRest={useFormRest} />
                <div className='buttons'>
                    <Button onClick={() => useFormRest.reset()} theme='cancel'>Wyczyść</Button>
                    <Button onClick={handleSubmit(addProduct)} theme='primary'>Dodaj</Button>
                </div>
            </form>
        </div>
    )
}

export default AddProductPage;