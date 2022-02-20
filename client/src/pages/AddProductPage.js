import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ParentProductForm from '../components/Products/AddProduct/ParentProductForm'
import ProductsEnum from '../../src/components/Products/ProductsEnum';
import { Dropdown } from '../components/Common/Dropdown'
import { MeterFormPure } from '../components/Products/Detail/Forms/MeterForm';
import { PremadeFormPure } from '../components/Products/Detail/Forms/PremadeForm';
import { PillowFormPure } from '../components/Products/Detail/Forms/PillowForm';
import { TowelFormPure } from '../components/Products/Detail/Forms/TowelForm';
import Button from '../components/Common/Button';
import './AddProductPage.css';

function AddProductPage() {
    const { handleSubmit, ...restUseForm } = useForm();
    const [category, setCategory] = useState(ProductsEnum.meter);
    
    function addProduct(formData) {
        console.log(formData)
    }

    return (
        <div className='add-product-page'>
            <h1>Dodawanie nowego produktu</h1>
            <ParentProductForm />
            {/* <div>
                <h1>Dodaj podprodukt</h1>
                <div className='choose-category-parent'>
                    Produkt: 
                    <Dropdown
                        className='choose-category'
                        options={[
                            {value: '381123-102', label: '381123-102'},
                            {value: '380366-103', label: '380366-103'}
                        ]}
                        defaultValue={{value: '381123-102', label: '381123-102'}}
                    />
                </div>
                <div className='choose-category-parent'>
                    Kategoria: 
                    <Dropdown
                        onChange={value => setCategory(value.value)}
                        className='choose-category'
                        options={[
                            {value: ProductsEnum.meter, label: 'Metraż'},
                            {value: ProductsEnum.premade, label: 'Gotowy'},
                            {value: ProductsEnum.pillow, label: 'Poszewka'},
                            {value: ProductsEnum.towel, label: 'Ręcznik'}
                        ]}
                        defaultValue={{value: ProductsEnum.meter, label: 'Metraż'}}
                    />
                </div>
                {category === ProductsEnum.meter && <MeterFormPure />}
                {category === ProductsEnum.premade && <PremadeFormPure />}
                {category === ProductsEnum.pillow && <PillowFormPure />}
                {category === ProductsEnum.towel && <TowelFormPure />}
            </div> */}
        </div>
    )
}

export default AddProductPage;