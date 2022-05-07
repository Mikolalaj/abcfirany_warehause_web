import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import NewProductForm from '../components/Products/AddProduct/NewProductForm'
import Button from '../components/Common/Button';
import useAPI from '../hooks/useAPI';
import './AddProductPage.css';

function AddProductPage() {
    const { handleSubmit, ...useFormRest } = useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const [state,, setRequestData,, setIsReady] = useAPI('post', '/products/add', [], false)

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
        
        setRequestData(formData)
        setIsReady(true)
    }

    useEffect(() => {
        if (state.isSuccess) {
            setErrorMessage('Pomyślnie dodano nowy produkt');
            window.scrollTo(0, 0);
            console.log(state.data)
        }
        else if (state.isError) {
            setErrorMessage(state.errorMessage);
            window.scrollTo(0, 0);
        }
    }, [state.isSuccess])

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