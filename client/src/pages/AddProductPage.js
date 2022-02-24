import { useContext, useState } from 'react';
import { FetchContext } from '../context/FetchContext';
import { useForm } from 'react-hook-form';
import NewProductForm from '../components/Products/AddProduct/NewProductForm'
import Button from '../components/Common/Button';
import './AddProductPage.css';

function AddProductPage() {
    const { handleSubmit, ...useFormRest } = useForm();
    const { authAxios } = useContext(FetchContext);
    const [errorMessage, setErrorMessage] = useState('');

    async function addProduct(formData) {
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

        try {
            const { data } = await authAxios.post('/products/add', formData);
            console.log(data)
        } catch ({ response: { data: { message } } }) {
            setErrorMessage(message);
            window.scrollTo(0, 0);
        }
    }

    return (
        <div className='add-product-page'>
            <h1>Dodaj nowy produkt</h1>
            <div className='error-message'>{errorMessage}</div>
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