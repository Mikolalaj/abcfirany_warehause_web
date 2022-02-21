import { useState } from 'react'
import { 
    SymbolInput,
    FeaturesInput,
    SaleInput,
    CommentsInput,
    SymbolDropdownInput
} from '../Forms/Inputs';

import ProductsEnum from '../ProductsEnum'
import { ControlledDropdown } from '../../Common/Dropdown'
import { MeterInputs } from '../Forms/MeterForm';
import { PremadeInputs } from '../Forms/PremadeForm';
import { PillowInputs } from '../Forms/PillowForm';
import { TowelInputs } from '../Forms/TowelForm';

import './NewProductForm.css'


function NewProductForm({ useFormRest }) {
    const { formState: { errors } } = useFormRest;

    const [image, setImage] = useState('https://abcfirany.pl/images/no_image.jpg')
    const [imageError, setImageError] = useState(false)
    const [formStatus, setFormStatus] = useState(true)

    const [category, setCategory] = useState(ProductsEnum.meter);
    const [featureOptions, setFeatureOptions] = useState([]);


    function imageExists(url, callback) {
        var img = new Image();
        img.onload = function() { callback(true); };
        img.onerror = function() { callback(false); };
        img.src = url;
    }

    function handleImageChange() {
        let newImageUrl = useFormRest.getValues('image')

        if (newImageUrl === '') {
            setImage('https://abcfirany.pl/images/no_image.jpg')
            return
        }
        imageExists(newImageUrl, function(exists) {
            if (exists) {
                setImageError(false)
                setImage(newImageUrl)
            }
            else {
                setImageError(true)
                setImage('https://abcfirany.pl/images/no_image.jpg')
            }
        });
    }

    return (
    <>
        <div className='parent-product-form'>
            {formStatus ? 
            <>
                <div className='image-forms'>
                    <img src={image} alt='parent product' />
                    <div className='forms'>
                        <SymbolInput useForm={useFormRest}/>
                        <FeaturesInput useForm={useFormRest} rules={{onChange: (e) => {setFeatureOptions(e.target.value); useFormRest.setValue('feature', null)}}}/>
                        <SaleInput useForm={useFormRest} />
                    </div>
                </div>
                <div className='rest-forms'>
                    <div>
                    {imageError && <p className='input-error-text'>Pod tym adresem nie ma zdjęcia</p>}
                    <input
                        className={errors.image && 'input-error'}
                        type='text'
                        placeholder='URL zdjęcia'
                        {...useFormRest.register('image', {
                            onBlur: () => handleImageChange(),
                            maxLength: {
                                value: 250,
                                message: 'Adres URL zdjęcia może mieć maksymalnie 250 znaków'
                            }
                        })}
                    />
                    {errors.image && <p className='input-error-text'>{errors.image.message}</p>}
                    </div>
                    <CommentsInput useForm={useFormRest} name='parentComments'/>
                </div>
            </>
            :
            <div className='rest-forms'>
                <SymbolDropdownInput useForm={useFormRest} />
            </div>
            }
            <div className='switch-form' onClick={() => setFormStatus(!formStatus)}>
                {formStatus ? 'Użyj istniejącego produktu' : 'Stwórz nowy produkt'}
            </div>
        </div>
        <div className='choose-category-parent'>
            Kategoria: 
            <ControlledDropdown
                errors={useFormRest.formState.errors}
                control={useFormRest.control}
                name='category'
                rules={{
                    required: {
                        value: true,
                        message: 'Wybierz kategorię produktu'
                    },
                    onChange: e => {setCategory(e.target.value.value); useFormRest.reset()}
                }}
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
        {category === ProductsEnum.meter && <MeterInputs useFormRest={useFormRest} autoFocus={false} productData={{featureOptions}} />}
        {category === ProductsEnum.premade && <PremadeInputs useFormRest={useFormRest} autoFocus={false} productData={{featureOptions}} />}
        {category === ProductsEnum.pillow && <PillowInputs useFormRest={useFormRest} autoFocus={false} productData={{featureOptions}} />}
        {category === ProductsEnum.towel && <TowelInputs useFormRest={useFormRest} autoFocus={false} productData={{featureOptions}} />}
    </>
    )
}

export default NewProductForm;