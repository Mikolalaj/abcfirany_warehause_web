import { useState, useContext, useEffect } from 'react'
import { 
    SymbolInput,
    FeaturesInput,
    SaleInput,
    CommentsInput
} from '../Detail/Forms/Inputs';
import { useForm } from 'react-hook-form';
import './ParentProductForm.css'

function ParentProductForm() {
    const { handleSubmit, ...restUseForm } = useForm();
    const { formState: { errors } } = restUseForm;
    const [image, setImage] = useState('https://abcfirany.pl/images/no_image.jpg')
    const [imageError, setImageError] = useState(false)

    function imageExists(url, callback) {
        var img = new Image();
        img.onload = function() { callback(true); };
        img.onerror = function() { callback(false); };
        img.src = url;
    }

    function handleImageChange() {
        let newImageUrl = restUseForm.getValues('image')

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

    function onSubmit(formData) {
        console.log(formData)
    }

    return (
        <div className='parent-product-form'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='image-forms'>
                    <img src={image} alt='parent product' />
                    <div className='forms'>
                        <SymbolInput useForm={restUseForm}/>
                        <FeaturesInput useForm={restUseForm} />
                        <SaleInput useForm={restUseForm} />
                    </div>
                </div>
                <div className='rest-forms'>
                    <div>
                    {imageError && <p className='input-error-text'>Pod tym adresem nie ma zdjęcia</p>}
                    <input
                        className={errors.image && 'input-error'}
                        type='text'
                        placeholder='URL zdjęcia'
                        {...restUseForm.register('image', {
                            onBlur: () => handleImageChange(),
                            maxLength: {
                                value: 250,
                                message: 'Adres URL zdjęcia może mieć maksymalnie 250 znaków'
                            }
                        })}
                    />
                    {errors.image && <p className='input-error-text'>{errors.image.message}</p>}
                    </div>
                    <CommentsInput useForm={restUseForm} />
                </div>
                <div className='buttons'>

                </div>
            </form>
        </div>
    )
}

export default ParentProductForm;