import { useState, useEffect } from 'react'
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

import useAPI from '../../../hooks/useAPI';

import './NewProductForm.css'


function NewProductForm({ useFormRest }) {
    const { formState: { errors }, setValue, getValues, control, unregister, register, reset, resetField } = useFormRest;

    const [image, setImage] = useState('https://abcfirany.pl/images/no_image.jpg')
    const [imageError, setImageError] = useState(false)
    const [formStatus, setFormStatus] = useState(true)

    const [category, setCategory] = useState(ProductsEnum.meter);
    const [featureOptions, setFeatureOptions] = useState([]);

    function modifyDataFeatures(data) {
        return data.map(item => ({
            value: item.feature_id,
            label: item.name
        }))
    }

    const [productId, setProductId] = useState('null');
    const [state, setUrl, , , , refresh] = useAPI('get', '/products/features/', [])

    useEffect(() => {
        if (state.isSuccess && !formStatus) {
            setFeatureOptions(modifyDataFeatures(state.data))
        }
    }, [state.isSuccess])

    useEffect(() => {
        if (!formStatus) {
            resetField('feature')
            setFeatureOptions([])
            setUrl(`/products/features/${productId}`)
            refresh()
        }
    }, [productId])
    

    function imageExists(url, callback) {
        var img = new Image();
        img.onload = function() { callback(true); };
        img.onerror = function() { callback(false); };
        img.src = url;
    }

    function handleImageChange() {
        let newImageUrl = getValues('image')

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

    function unregisterChildProductForm() {
        unregister(['width', 'size', 'amount', 'shelfCode', 'feature', 'comments', 'finish'])
    }

    function unregisterParentProductForm() {
        reset()
        setFeatureOptions([])
        unregister(['symbol', 'features', 'sale', 'parentComments', 'image', 'shelfCode'])
        setImage('https://abcfirany.pl/images/no_image.jpg')
        setCategory(ProductsEnum.meter)
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
                        <FeaturesInput useForm={useFormRest} rules={{onChange: (e) => {setFeatureOptions(e.target.value); setValue('feature', null)}}}/>
                        <SaleInput useForm={useFormRest} />
                    </div>
                </div>
                <div className='rest-forms'>
                    <div>
                    {imageError && <p className='input-error-text'>Pod tym adresem nie ma zdj??cia</p>}
                    <input
                        className={errors.image && 'input-error'}
                        type='text'
                        placeholder='URL zdj??cia'
                        {...register('image', {
                            onBlur: () => handleImageChange(),
                            maxLength: {
                                value: 250,
                                message: 'Adres URL zdj??cia mo??e mie?? maksymalnie 250 znak??w'
                            }
                        })}
                    />
                    {errors.image && <p className='input-error-text'>{errors.image.message}</p>}
                    </div>
                    <CommentsInput useForm={useFormRest} name='parentComments'/>
                </div>
                <div className='switch-form' onClick={() => {setFormStatus(!formStatus); unregisterParentProductForm()}}>
                    {formStatus ? 'U??yj istniej??cego produktu' : 'Stw??rz nowy produkt'}
                </div>
            </>
            :
            <div className='labeled-dropdown'>
                <div className="label">Produkt:</div>
                <SymbolDropdownInput useForm={useFormRest} rules={{onChange: (e) => {setProductId(e.target.value.value)}}} />
                <div className='switch-form right' onClick={() => {setFormStatus(!formStatus); unregisterParentProductForm()}}>
                    {formStatus ? 'U??yj istniej??cego produktu' : 'Stw??rz nowy produkt'}
                </div>
            </div>
            }
        </div>
        <div className='child-product-form'>
            <div className='labeled-dropdown'>
                <div className="label">Kategoria: </div>
                <ControlledDropdown
                    errors={errors}
                    control={control}
                    name='category'
                    rules={{
                        required: {
                            value: true,
                            message: 'Wybierz kategori?? produktu'
                        },
                        onChange: e => {setCategory(e.target.value.value); unregisterChildProductForm()}
                    }}
                    className='choose-category'
                    options={[
                        {value: ProductsEnum.meter, label: 'Metra??'},
                        {value: ProductsEnum.premade, label: 'Gotowy'},
                        {value: ProductsEnum.pillow, label: 'Poszewka'},
                        {value: ProductsEnum.towel, label: 'R??cznik'}
                    ]}
                    defaultValue={{value: ProductsEnum.meter, label: 'Metra??'}}
                />
            </div>
            {category === ProductsEnum.meter && <MeterInputs productId={productId} useFormRest={useFormRest} autoFocus={false} productData={{featureOptions}} />}
            {category === ProductsEnum.premade && <PremadeInputs productId={productId} useFormRest={useFormRest} autoFocus={false} productData={{featureOptions}} />}
            {category === ProductsEnum.pillow && <PillowInputs productId={productId} useFormRest={useFormRest} autoFocus={false} productData={{featureOptions}} />}
            {category === ProductsEnum.towel && <TowelInputs productId={productId} useFormRest={useFormRest} autoFocus={false} productData={{featureOptions}} />}
        </div>
    </>
    )
}

export default NewProductForm;