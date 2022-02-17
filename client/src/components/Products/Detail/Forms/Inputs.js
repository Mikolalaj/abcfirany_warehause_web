import { useState, useContext, useEffect } from 'react'
import { FetchContext } from '../../../../context/FetchContext'
import { ToggleSwitchRegister } from '../../../Common/ToggleSwitch'
import { ControlledDropdown, ControlledCreateDropdown } from '../../../Common/Dropdown'
import { pillows } from '../../../../dicts'
import RegisteredInput from '../../../Common/RegisteredInput'
import RegisteredTextarea from '../../../Common/RegisteredTextarea'

function WidthInput({ useForm, defaultValue, autoFocus }) {
    return (
    <RegisteredInput 
        useForm={useForm}
        name='width'
        autoFocus={autoFocus}
        inputType='number'
        placeholder='Szerokość'
        defaultValue={defaultValue}
        options={{
            valueAsNumber: true,
            required: {
                value: true,
                message: 'Szerokość jest wymagana'
            },
            max: {
                value: 9999,
                message: 'Szerokość może mieć maksymalnie 4 znaków'
            },
            min: {
                value: 1,
                message: 'Szerokość musi być większa od 0'
            },
            validate: {
                integer: v => parseFloat(v) === parseInt(v) || 'Szerokość musi być liczbą całkowitą w cm'
            }
        }}
    />
    )
}

function AmountMeterInput({ useForm, defaultValue, autoFocus }) {

    function twoDecimals(input) {
        input = input.toString()
        input = input.replace(',', '.')
        if (input.indexOf('.') === -1) return true;
        if (input.length <= input.indexOf('.') + 3) return true;
        return 'Ilość może mieć maksymalnie dwie cyfry po przecinku'
    }

    return (
    <RegisteredInput
        useForm={useForm}
        name='amount'
        autoFocus={autoFocus}
        inputType='number'
        placeholder='Ilość metrów'
        defaultValue={defaultValue}
        options={{
            valueAsNumber: true,
            required: {
                value: true,
                message: 'Ilość jest wymagana'
            },
            max: {
                value: 99999,
                message: 'Ilość może mieć maksymalnie 5 znaków'
            },
            min: {
                value: 1,
                message: 'Ilość musi być większa od 0'
            },
            validate: {
                twoDecimals: v => twoDecimals(v)
            }
        }}
    />
    )
}

function AmountPiecesInput({ useForm, defaultValue, autoFocus }) {
    return (
    <RegisteredInput
        useForm={useForm}
        name='amount'
        autoFocus={autoFocus}
        inputType='number'
        placeholder='Ilość sztuk'
        defaultValue={defaultValue ? parseInt(defaultValue) : ''}
        options={{
            valueAsNumber: true,
            required: {
                value: true,
                message: 'Ilość jest wymagana'
            },
            max: {
                value: 99999,
                message: 'Ilość może mieć maksymalnie 5 znaków'
            },
            min: {
                value: 1,
                message: 'Ilość musi być większa od 0'
            },
            validate: {
                integer: v => parseFloat(v) === parseInt(v) || 'Ilość sztuk musi być liczbą całkowitą'
            }
        }}
    />
    )
}

function ShelfCodeInput({ useForm, defaultValue, autoFocus, type }) {
    const regex = type === 'pillows' ? /^[a-zA-Z]\d{1,2}$/ : /^\d{1,2}[-]\d{1,2}[-]\d{1,2}$/
    const format = type === 'pillows' ? 'A1' : '1-2-3'

    return (
    <RegisteredInput
        useForm={useForm}
        name='shelfCode'
        autoFocus={autoFocus}
        inputType='text'
        placeholder='Kod półki'
        defaultValue={defaultValue}
        options={{
            required: {
                value: true,
                message: 'Kod półki jest wymagany'
            },
            pattern: {
                value: regex,
                message: `Kod półki musi być w formacie ${format}`
            }
        }}
    />
    )
}

function CommentsInput({ useForm, defaultValue, autoFocus }) {
    return (
    <RegisteredTextarea
        useForm={useForm}
        name='comments'
        autoFocus={autoFocus}
        placeholder='Uwagi'
        defaultValue={defaultValue}
        options={{
            maxLength: {
                value: 100,
                message: 'Uwagi mogą mieć maksymalnie 100 znaków'
            }
        }}
    />
    )
}

function FinishInput({ useForm, defaultValue, autoFocus }) {
    return (
    <RegisteredInput
        useForm={useForm}
        name='finish'
        autoFocus={autoFocus}
        inputType='text'
        placeholder='Wykończenie'
        defaultValue={defaultValue}
        options={{
            required: {
                value: true,
                message: 'Wykończenie jest wymagane'
            },
            maxLength: {
                value: 100,
                message: 'Wykończenie może mieć maksymalnie 100 znaków'
            }
        }}
    />
    )
}

function SizeInput({ useForm, defaultValue, autoFocus }) {
    return (
    <RegisteredInput
        useForm={useForm}
        autoFocus={autoFocus}
        defaultValue={defaultValue}
        name='size'
        inputType='text'
        placeholder='Wymiary'
        options={{
            required: {
                value: true,
                message: 'Wymiar jest wymagany'
            },
            maxLength: {
                value: 10,
                message: 'Wymiar może mieć maksymalnie 10 znaków'
            }
        }}
    />
    )
}

function SymbolInput({ useForm, defaultValue, autoFocus }) {
    return (
    <RegisteredInput
        useForm={useForm}
        autoFocus={autoFocus}
        defaultValue={defaultValue}
        name='symbol'
        inputType='text'
        placeholder='Symbol'
        options={{
            required: {
                value: true,
                message: 'Symbol jest wymagany'
            },
            maxLength: {
                value: 100,
                message: 'Symbol może mieć maksymalnie 100 znaków'
            }
        }}
    />
    )
}

function ImageInput({ useForm, defaultValue, autoFocus }) {
    const { register, getValues, formState: { errors } } = useForm;
    const [image, setImage] = useState(defaultValue ? defaultValue : 'https://abcfirany.pl/images/no_image.jpg')
    const [imageError, setImageError] = useState(false)

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
                setImage(newImageUrl)
            }
            else {
                setImageError(true)
                setImage('https://abcfirany.pl/images/no_image.jpg')
            }
        });
    }

    return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} className='image-input'>
        <img style={{maxWidth: '150px', marginBottom: '10px'}} src={image} alt='product' />
        {imageError && <p className='input-error-text'>Pod tym adresem nie ma zdjęcia</p>}
        <input
            autoFocus={autoFocus}
            className={errors.image && 'input-error'}
            type='text'
            placeholder='URL zdjęcia'
            defaultValue={defaultValue}
            {...register('image', {
                onBlur: () => handleImageChange(),
                maxLength: {
                    value: 250,
                    message: 'Adres URL zdjęcia może mieć maksymalnie 250 znaków'
                }
            })}
        />
        {errors.image && <p className='input-error-text'>{errors.image.message}</p>}
    </div>
    )
}

function SaleInput({ useForm, defaultValue }) {
    const [isOn, setIsOn] = useState(true);

    return (
    <div style={{display: 'flex', alignItems: 'center'}}>
        <ToggleSwitchRegister
            setValue={setIsOn}
            value={isOn}
            defaultChecked={defaultValue}
            register={useForm.register('sale')}
        />
        Wyprzedaż
    </div>
    )
}

function FinishSizeInput({ useForm, defaultValue, autoFocus }) {
    const { control, resetField, formState: { errors } } = useForm;
    const [sizes, setSizes] = useState([]);
    const defaultFinish = {label: defaultValue.finish, value: defaultValue.finish}
    const defaultSize = {label: defaultValue.size, value: defaultValue.size}

    return (
    <>
    <ControlledDropdown
        errors={errors}
        name='finish'
        control={control}
        rules={{
            required: {
                value: true,
                message: 'Wykończenie jest wymagane'
            },
            onChange: (e) => {resetField("size"); setSizes(pillows[e.target.value.value])}
        }}
        autoFocus={autoFocus}
        placeholder='Wykończenie'
        options={Object.keys(pillows).map(key => ({value: key, label: key}))}
        defaultValue={defaultFinish}
        isSearchable={false}
    />
    <ControlledDropdown
        errors={errors}
        name='size'
        control={control}
        rules={{
            required: {
                value: true,
                message: 'Wymiar jest wymagany'
            }
        }}
        placeholder='Wymiar'
        options={sizes}
        defaultValue={defaultSize}
        isSearchable={false}
    />
    </>
    )
}

function FeatureInput({ productId, useForm, defaultValue, autoFocus }) {
    const { control, setValue, formState: { errors } } = useForm;
    const [features, setFeatures] = useState([]);
    const [isLoadingFeatures, setIsLoadingFeatures] = useState(false);
    
    const { authAxios } = useContext(FetchContext);

    function modifyDataFeatures(data) {
        return data.map(item => ({
            value: item.feature_id,
            label: item.name
        }))
    }

    useEffect(() => {
        async function fetchFeatures() {
            const { data } = await authAxios.get(`/products/features/${productId}`);
            let modifiedData = modifyDataFeatures(data);
            setFeatures(modifiedData);
            setIsLoadingFeatures(false);
            var result = modifiedData.filter(obj => {
                return obj.label === defaultValue
            });
            setValue('feature', result[0]);
        }
        setIsLoadingFeatures(true);
        fetchFeatures();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId])

    return (
    <ControlledDropdown
        errors={errors}
        name='feature'
        control={control}
        placeholder='Cecha'
        options={features}
        isSearchable={true}
        isLoading={isLoadingFeatures}
        autoFocus={autoFocus}
        isClearable={true}
    />
    )
}

function FeaturesInput({ useForm, defaultValue, autoFocus }) {
    const { control, setValue, formState: { errors } } = useForm;
    const [features, setFeatures] = useState([]);
    const [isLoadingFeatures, setIsLoadingFeatures] = useState(false);

    const { authAxios } = useContext(FetchContext);

    function modifyDataFeatures(data) {
        return data.map(item => ({
            value: item.feature_id,
            label: item.name
        }))
    }

    useEffect(() => {
        async function fetchFeatures() {
            const { data } = await authAxios.get('/products/features');
            let modifiedData = modifyDataFeatures(data);
            setFeatures(modifiedData);
            setIsLoadingFeatures(false);
            var result = modifiedData.filter(obj => {
                return defaultValue.includes(obj.label)
            });
            setValue('features', result);
        }
        setIsLoadingFeatures(true);
        fetchFeatures();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
    <ControlledCreateDropdown
        errors={errors}
        name='features'
        control={control}
        placeholder='Cechy'
        options={features}
        isSearchable={true}
        isLoading={isLoadingFeatures}
        autoFocus={autoFocus}
        isClearable={true}
        isMulti={true}
    />
    )
}

export {
    WidthInput,
    AmountMeterInput,
    AmountPiecesInput,
    ShelfCodeInput,
    CommentsInput,
    FinishInput,
    SizeInput,
    SymbolInput,
    ImageInput,
    SaleInput,
    FinishSizeInput,
    FeatureInput,
    FeaturesInput
};